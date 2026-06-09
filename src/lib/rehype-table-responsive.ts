/**
 * Minimal HAST node shapes — enough for this transform without pulling in the
 * `@types/hast` dependency (this repo intentionally keeps no `@types/*` packages).
 */
export interface HastProperties {
  className?: string | string[];
  [key: string]: unknown;
}

export interface HastElement {
  type: 'element';
  tagName: string;
  properties?: HastProperties;
  children: HastNode[];
}

export interface HastRoot {
  type: 'root';
  children: HastNode[];
}

export interface HastLeaf {
  type: 'text' | 'comment' | 'doctype' | 'raw';
  value?: string;
  [key: string]: unknown;
}

export type HastNode = HastElement | HastRoot | HastLeaf;

/**
 * Wraps markdown tables in `.table-responsive` so wide tables scroll
 * inside the prose column instead of causing page-level horizontal overflow.
 */
export function rehypeTableResponsive() {
  return (tree: HastRoot) => {
    visitElements(tree, (node, parent, index) => {
      if (node.tagName !== 'table' || !parent || index === undefined) {
        return;
      }

      if (
        parent.type === 'element' &&
        parent.tagName === 'div' &&
        hasClass(parent, 'table-responsive')
      ) {
        return;
      }

      const wrapper: HastElement = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-responsive'] },
        children: [node],
      };

      parent.children[index] = wrapper;
    });
  };
}

function hasClass(node: HastElement, className: string): boolean {
  const classNames = node.properties?.className;
  if (!classNames) return false;
  return Array.isArray(classNames)
    ? classNames.includes(className)
    : className === classNames;
}

function visitElements(
  node: HastRoot | HastElement,
  callback: (
    node: HastElement,
    parent: HastElement | HastRoot | undefined,
    index: number | undefined
  ) => void,
  parent?: HastElement | HastRoot,
  index?: number
): void {
  if (node.type === 'element') {
    callback(node, parent, index);
  }

  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (child.type === 'element') {
      visitElements(child, callback, node, i);
    }
  }
}
