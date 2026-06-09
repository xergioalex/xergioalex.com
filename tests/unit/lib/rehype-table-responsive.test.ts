import { describe, expect, it } from 'vitest';

import {
  type HastElement,
  type HastRoot,
  rehypeTableResponsive,
} from '@/lib/rehype-table-responsive';

function tableElement(): HastElement {
  return {
    type: 'element',
    tagName: 'table',
    properties: {},
    children: [],
  };
}

describe('rehypeTableResponsive', () => {
  it('wraps bare tables in a table-responsive div', () => {
    const tree: HastRoot = {
      type: 'root',
      children: [tableElement()],
    };

    rehypeTableResponsive()(tree);

    expect(tree.children).toHaveLength(1);
    const wrapper = tree.children[0] as HastElement;
    expect(wrapper.tagName).toBe('div');
    expect(wrapper.properties?.className).toEqual(['table-responsive']);
    expect(wrapper.children[0]?.type).toBe('element');
    expect((wrapper.children[0] as HastElement).tagName).toBe('table');
  });

  it('does not double-wrap tables already inside table-responsive', () => {
    const tree: HastRoot = {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-responsive'] },
          children: [tableElement()],
        },
      ],
    };

    rehypeTableResponsive()(tree);

    const wrapper = tree.children[0] as HastElement;
    expect(wrapper.tagName).toBe('div');
    expect(wrapper.properties?.className).toEqual(['table-responsive']);
    expect(wrapper.children).toHaveLength(1);
    expect((wrapper.children[0] as HastElement).tagName).toBe('table');
  });
});
