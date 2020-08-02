import { workspace } from 'vscode';

function getConfiguration() {
  return workspace.getConfiguration('dircolors');
}

function getShouldFormatColumns(): boolean {
  return getConfiguration().get<boolean>('formatColumns', true);
}

function getMinSpacing(): number {
  return getConfiguration().get<number>('minSpacing', 1);
}

export default {
  getShouldFormatColumns,
  getMinSpacing,
};
