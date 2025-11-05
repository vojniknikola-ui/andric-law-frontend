export const renderRichText = (content: any): string => {
  if (typeof content === 'string') return content;
  if (!content || !Array.isArray(content)) return '';

  const result: string[] = [];

  const processNode = (node: any): string => {
    if (!node) return '';

    if (node.text !== undefined) {
      if (node.code) return `\`${node.text}\``;
      
      let text = node.text;
      if (node.bold) text = `**${text}**`;
      if (node.italic) text = `*${text}*`;
      if (node.underline) text = `<u>${text}</u>`;
      if (node.strikethrough) text = `~~${text}~~`;
      return text;
    }

    const children = node.children?.map(processNode).join('') || '';

    switch (node.type) {
      case 'paragraph': return `${children}\n\n`;
      case 'heading': return `${'#'.repeat(node.level || 1)} ${children}\n\n`;
      case 'list': return `${children}\n`;
      case 'list-item': return `${node.format === 'ordered' ? '1.' : '-'} ${children}\n`;
      case 'quote': return `> ${children}\n\n`;
      case 'code': return `\n\`\`\`\n${children}\n\`\`\`\n\n`;
      case 'link': return `[${children}](${node.url || '#'})`;
      case 'image': return `![${children}](${node.url || ''})`;
      default: return children;
    }
  };

  for (let i = 0; i < content.length; i++) {
    result.push(processNode(content[i]));
  }

  return result.join('');
};
