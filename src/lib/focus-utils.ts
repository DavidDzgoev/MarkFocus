export function getCurrentParagraph(text: string, cursorPosition: number): {
  startIndex: number;
  endIndex: number;
  paragraphText: string;
} {
  if (!text || cursorPosition < 0) {
    return { startIndex: 0, endIndex: 0, paragraphText: '' };
  }

  // Находим начало абзаца (предыдущий двойной перенос строки или начало текста)
  let startIndex = cursorPosition;
  while (startIndex > 0) {
    if (text[startIndex - 1] === '\n' && text[startIndex] === '\n') {
      startIndex += 1; // Пропускаем двойной перенос
      break;
    }
    startIndex--;
  }

  // Находим конец абзаца (следующий двойной перенос строки или конец текста)
  let endIndex = cursorPosition;
  while (endIndex < text.length) {
    if (text[endIndex] === '\n' && text[endIndex + 1] === '\n') {
      break;
    }
    endIndex++;
  }

  const paragraphText = text.slice(startIndex, endIndex);
  
  return {
    startIndex,
    endIndex,
    paragraphText: paragraphText.trim()
  };
}

export function splitTextByParagraphs(text: string): string[] {
  return text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0);
}
