import { TextDocument } from 'vscode';
import { forEachLine, getLineItemLength, isDeclarationLine } from './lines';
import { DeclarationGroup } from './types';

export function parseDeclarationGroups(document: TextDocument): DeclarationGroup[] {
  const declarationGroups: DeclarationGroup[] = [];
  let currentGroup: DeclarationGroup | undefined;

  forEachLine(document, (line) => {
    if (isDeclarationLine(line)) {
      const itemLength = getLineItemLength(line.text);

      if (!currentGroup) {
        currentGroup = {
          longestItemLength: itemLength,
          lineStart: line.lineNumber,
          lineEnd: 0,
        };
      } else if (currentGroup.longestItemLength < itemLength) {
        currentGroup.longestItemLength = itemLength;
      }
    } else {
      if (currentGroup) {
        currentGroup.lineEnd = line.lineNumber - 1;
        declarationGroups.push(currentGroup);
        currentGroup = undefined;
      }
    }
  });

  return declarationGroups;
}
