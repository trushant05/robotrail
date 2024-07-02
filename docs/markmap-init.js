document.addEventListener('DOMContentLoaded', function() {
  const { Markmap } = window.markmap;
  const el = document.querySelector('svg.markmap');
  const options = {
    preset: 'colorful',
    nodeMinHeight: 30,
    nodeWidth: (node) => Math.max(120, node.text.length * 8),
    spacingVertical: 20,
    spacingHorizontal: 100,
    fit: true,
    color: (node) => node.children ? '#3b82f6' : '#10b981',
  };
  const transformer = new Markmap.Transformer();
  const { root } = transformer.transform(el.textContent);
  const markmap = new Markmap(el, options);

  // Customize layout here
  function distributeNodes(node, angle = 0, distance = 100, depth = 0) {
    if (!node.children || !node.children.length) return;
    const step = (2 * Math.PI) / node.children.length;
    node.children.forEach((child, index) => {
      const childAngle = angle + index * step;
      child.x = node.x + distance * Math.cos(childAngle);
      child.y = node.y + distance * Math.sin(childAngle);
      distributeNodes(child, childAngle, distance, depth + 1);
    });
  }
  distributeNodes(root);

  markmap.setData(root);
  markmap.fit();
});

