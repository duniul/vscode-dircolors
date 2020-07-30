import { languages, TextDocument, TextEdit } from 'vscode';
import { createSpacingFormatter, removeLeadingWhitespace } from './formatters';
import { forEachLine, isDeclarationLine } from './lines';

function provideDocumentFormattingEdits(document: TextDocument): TextEdit[] {
  const textEdits: TextEdit[] = [];
  const formatSpacing = createSpacingFormatter(document);

  forEachLine(document, (line) => {
    let newText = removeLeadingWhitespace(line.text);

    if (isDeclarationLine(line)) {
      newText = formatSpacing(newText, line);
    }

    if (line.text !== newText) {
      textEdits.push(TextEdit.replace(line.range, newText));
    }
  });

  return textEdits;
}

export async function activate(): Promise<void> {
  languages.registerDocumentFormattingEditProvider('dircolors', {
    provideDocumentFormattingEdits,
  });
}
