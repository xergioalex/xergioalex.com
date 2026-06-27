/**
 * Sätteri HAST plugins (Astro 7).
 *
 * Sätteri — the Rust-powered Markdown/MDX compiler that became the default and
 * only compiler in Astro 7 — does not run remark/rehype plugins. These two
 * plugins replace the former `rehype-external-links` dependency and the in-repo
 * `rehypeTableResponsive` transform, ported to Sätteri's HAST plugin API
 * (registered via `markdown.processor: satteri({ hastPlugins: [...] })`).
 *
 * The node/context shapes below are intentionally hand-rolled — the same
 * approach the rest of this repo takes — so we avoid pulling in `@types/hast`.
 * They mirror Sätteri's public `HastPluginDefinition` / `HastVisitorContext`
 * types closely enough to register and to keep the visitors type-safe.
 */

/** Minimal HAST element shape — enough for these transforms. */
export interface HastElement {
  type: 'element';
  tagName: string;
  properties?: Record<string, unknown>;
  children: unknown[];
}

/**
 * Subset of Sätteri's `HastVisitorContext` used by the plugins below. Mutations
 * are applied through the context (not by reaching into the tree directly) so
 * the Rust side can mirror them back into the arena.
 */
export interface HastVisitorContext {
  setProperty(node: HastElement, key: string, value: unknown): void;
  wrapNode(node: HastElement, parentNode: HastElement): void;
  parent(node: HastElement): HastElement | undefined;
}

/** Shape accepted by `satteri({ hastPlugins })`. */
export interface SatteriHastPlugin {
  name: string;
  element: {
    filter: string[];
    visit(node: HastElement, ctx: HastVisitorContext): void;
  };
}

function hasClass(node: HastElement, className: string): boolean {
  const classNames = node.properties?.className;
  if (!classNames) return false;
  return Array.isArray(classNames)
    ? classNames.includes(className)
    : className === classNames;
}

/**
 * Opens external (http/https) links in a new tab with safe `rel` attributes.
 * Sätteri replacement for `rehype-external-links`.
 */
export function satteriExternalLinks(): SatteriHastPlugin {
  return {
    name: 'external-links',
    element: {
      filter: ['a'],
      visit(node, ctx) {
        const href = node.properties?.href;
        if (typeof href === 'string' && /^https?:\/\//i.test(href)) {
          ctx.setProperty(node, 'target', '_blank');
          ctx.setProperty(node, 'rel', ['noopener', 'noreferrer']);
        }
      },
    },
  };
}

/**
 * Wraps markdown tables in `.table-responsive` so wide tables scroll inside the
 * prose column instead of causing page-level horizontal overflow. Sätteri port
 * of the former in-repo `rehypeTableResponsive` transform.
 */
export function satteriTableResponsive(): SatteriHastPlugin {
  return {
    name: 'table-responsive',
    element: {
      filter: ['table'],
      visit(node, ctx) {
        const parent = ctx.parent(node);
        if (
          parent &&
          parent.type === 'element' &&
          parent.tagName === 'div' &&
          hasClass(parent, 'table-responsive')
        ) {
          return;
        }

        ctx.wrapNode(node, {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-responsive'] },
          children: [],
        });
      },
    },
  };
}
