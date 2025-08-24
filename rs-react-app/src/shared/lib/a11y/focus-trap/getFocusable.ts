export function getFocusable(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  const nodes = container.querySelectorAll(selector);
  const result: HTMLElement[] = [];

  nodes.forEach((node) => {
    if (node instanceof HTMLElement) {
      result.push(node);
    }
  });
  return result;
}
