import { describe, expect, it, vi } from 'vitest';

import {
  type HastElement,
  type HastVisitorContext,
  satteriExternalLinks,
  satteriTableResponsive,
} from '@/lib/satteri-plugins';

/** A spyable stand-in for Sätteri's HastVisitorContext. */
function mockContext(parent?: HastElement): HastVisitorContext {
  return {
    setProperty: vi.fn(),
    wrapNode: vi.fn(),
    parent: vi.fn(() => parent),
  };
}

function anchor(href: unknown): HastElement {
  return { type: 'element', tagName: 'a', properties: { href }, children: [] };
}

function table(): HastElement {
  return { type: 'element', tagName: 'table', properties: {}, children: [] };
}

describe('satteriTableResponsive', () => {
  it('filters only table elements', () => {
    expect(satteriTableResponsive().element.filter).toEqual(['table']);
  });

  it('wraps a bare table in a table-responsive div', () => {
    const ctx = mockContext();
    const node = table();

    satteriTableResponsive().element.visit(node, ctx);

    expect(ctx.wrapNode).toHaveBeenCalledTimes(1);
    const wrapper = (ctx.wrapNode as ReturnType<typeof vi.fn>).mock
      .calls[0][1] as HastElement;
    expect(wrapper.tagName).toBe('div');
    expect(wrapper.properties?.className).toEqual(['table-responsive']);
  });

  it('does not double-wrap tables already inside a table-responsive div', () => {
    const parent: HastElement = {
      type: 'element',
      tagName: 'div',
      properties: { className: ['table-responsive'] },
      children: [],
    };
    const ctx = mockContext(parent);

    satteriTableResponsive().element.visit(table(), ctx);

    expect(ctx.wrapNode).not.toHaveBeenCalled();
  });
});

describe('satteriExternalLinks', () => {
  it('filters only anchor elements', () => {
    expect(satteriExternalLinks().element.filter).toEqual(['a']);
  });

  it('opens http(s) links in a new tab with safe rel attributes', () => {
    const ctx = mockContext();
    const node = anchor('https://example.com');

    satteriExternalLinks().element.visit(node, ctx);

    expect(ctx.setProperty).toHaveBeenCalledWith(node, 'target', '_blank');
    expect(ctx.setProperty).toHaveBeenCalledWith(node, 'rel', [
      'noopener',
      'noreferrer',
    ]);
  });

  it('leaves relative links untouched', () => {
    const ctx = mockContext();

    satteriExternalLinks().element.visit(anchor('/blog/post'), ctx);

    expect(ctx.setProperty).not.toHaveBeenCalled();
  });

  it('ignores anchors without an href', () => {
    const ctx = mockContext();

    satteriExternalLinks().element.visit(anchor(undefined), ctx);

    expect(ctx.setProperty).not.toHaveBeenCalled();
  });
});
