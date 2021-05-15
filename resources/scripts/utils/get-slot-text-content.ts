import { VNode } from 'vue';

export function getSlotTextContent(children: VNode[]): string {
  return children
    .map((node) => {
      if (typeof node.children === 'string') {
        return node.children;
      }

      if (Array.isArray(node.children)) {
        return getSlotTextContent(node.children as VNode[]);
      }

      return '';
    })
    .join('');
}

export default getSlotTextContent;
