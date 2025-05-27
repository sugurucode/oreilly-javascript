import { readFileSync, writeFileSync } from 'fs';

// Read the AST JSON file
const ast = JSON.parse(readFileSync('ast1.json', 'utf-8'));

// Helper function to generate DOT format for Graphviz
function generateDot(ast: any, parentId: string | null = null, nodeId: number = 0): { dot: string; nextId: number } {
  let dot = '';
  const currentId = nodeId;
  dot += `  node${currentId} [label=\"${ast.type}\"]\n`;

  if (parentId !== null) {
    dot += `  node${parentId} -> node${currentId}\n`;
  }

  let nextId = currentId + 1;

  for (const key in ast) {
    if (typeof ast[key] === 'object' && ast[key] !== null && !Array.isArray(ast[key])) {
      const result = generateDot(ast[key], currentId.toString(), nextId);
      dot += result.dot;
      nextId = result.nextId;
    } else if (Array.isArray(ast[key])) {
      for (const item of ast[key]) {
        if (typeof item === 'object' && item !== null) {
          const result = generateDot(item, currentId.toString(), nextId);
          dot += result.dot;
          nextId = result.nextId;
        }
      }
    }
  }

  return { dot, nextId };
}

// Generate DOT content
const { dot } = generateDot(ast);
const dotContent = `digraph AST {\n${dot}}`;

// Save DOT file
writeFileSync('ast1.dot', dotContent);
console.log('DOT file has been generated as ast1.dot.');