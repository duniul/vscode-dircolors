import { TextDocument, TextLine } from 'vscode';

export function getLineItemLength(lineText: string): number {
  return lineText.search(/\s/);
}

export function isCommentLine(line: TextLine): boolean {
  const firstNonWSChar = line.text.charAt(line.firstNonWhitespaceCharacterIndex);
  return firstNonWSChar === '#';
}

export function isDeclarationLine(line: TextLine): boolean {
  return !line.isEmptyOrWhitespace && !isCommentLine(line);
}

export function forEachLine(document: TextDocument, iteratee: (line: TextLine) => void): void {
  const lineCount = document.lineCount;
  let nextLineNumber = 0;
  while (nextLineNumber < lineCount) {
    const line = document.lineAt(nextLineNumber);
    iteratee(line);
    nextLineNumber++;
  }
}
