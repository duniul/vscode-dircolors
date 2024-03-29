import { TextDocument, TextLine } from 'vscode';
import configuration from './configuration';
import { parseDeclarationGroups } from './declarationGroups';
import { getLineItemLength } from './lines';
import { DeclarationGroup, Formatter } from './types';

const SPACING_REGEXP = /^([^#\s][^\s]+)\s+([^#\s]+)( ?)\s*(#?)/;

export function removeLeadingWhitespace(currentLineText: string): string {
  return currentLineText.replace(/^\s+/, '');
}

function formatSpacing(lineText: string, spacing: string) {
  return lineText.replace(SPACING_REGEXP, `$1${spacing}$2$3$4`).trim();
}

export function formatSpacingSimple(currentLineText: string): string {
  const minSpacing = configuration.getMinSpacing();
  return formatSpacing(currentLineText, ' '.repeat(minSpacing || 0));
}

export function formatSpacingColumns(
  currentLineText: string,
  line: TextLine,
  declarationGroups: DeclarationGroup[]
): string {
  const minSpacing = configuration.getMinSpacing();
  const declarationGroup = declarationGroups.find(
    (group) => group.lineStart <= line.lineNumber && group.lineEnd >= line.lineNumber
  );

  const groupLength = declarationGroup?.longestItemLength || 0;
  const itemLength = getLineItemLength(currentLineText);
  const spacingOffset = groupLength - itemLength + minSpacing;
  const spacing = ' '.repeat(spacingOffset);
  return formatSpacing(currentLineText, spacing);
}

export function createSpacingFormatter(document: TextDocument): Formatter {
  if (configuration.getShouldFormatColumns()) {
    const declarationGroups = parseDeclarationGroups(document);

    return (currentLineText: string, line: TextLine) =>
      formatSpacingColumns(currentLineText, line, declarationGroups);
  }

  return formatSpacingSimple;
}
