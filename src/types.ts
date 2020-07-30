import { TextLine } from 'vscode';

export interface DeclarationGroup {
  longestItemLength: number;
  lineStart: number;
  lineEnd: number;
}

export type Formatter = (currentLineText: string, line: TextLine) => string;
