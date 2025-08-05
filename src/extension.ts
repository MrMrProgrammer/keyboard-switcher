import * as vscode from 'vscode';

const faToEnMap: Record<string, string> = {
  // 0
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
  '۰': '0',

  // 1
  'ض': 'q',
  'ص': 'w',
  'ث': 'e',
  'ق': 'r',
  'ف': 't',
  'غ': 'y',
  'ع': 'u',
  'ه': 'i',
  'خ': 'o',
  'ح': 'p',
  'ج': '[',
  'چ': ']',

  // 2
  'ش': 'a',
  'س': 's',
  'ی': 'd',
  'ب': 'f',
  'ل': 'g',
  'ا': 'h',
  'ت': 'j',
  'ن': 'k',
  'م': 'l',
  'ک': ';',
  'گ': "'",

  // 3
  'ظ': 'z',
  'ط': 'x',
  'ز': 'c',
  'ر': 'v',
  'ذ': 'b',
  'د': 'n',
  'پ': 'm',
  'و': ',',
  'ـ': '_',
};

const enToFaMap = Object.fromEntries(
	Object.entries(faToEnMap).map(([k, v]) => [v, k])
);

function convertLayout(text: string, direction: 'fa2en' | 'en2fa'): string {
  const map = direction === 'fa2en' ? faToEnMap : enToFaMap;
  return text
    .split('')
    .map(c => map[c] || c)
    .join('');
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('keyboard-switcher.convertLayout', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const selection = editor.selection;
    const text = editor.document.getText(selection);

    if (!text) {
      vscode.window.showInformationMessage('Please select some text to convert.');
      return;
    }

    const direction = await vscode.window.showQuickPick(['fa2en', 'en2fa'], {
      placeHolder: 'Choose conversion direction (فارسی → انگلیسی یا برعکس)'
    });

    if (!direction) {return;}

    const converted = convertLayout(text, direction as 'fa2en' | 'en2fa');

    editor.edit(editBuilder => {
      editBuilder.replace(selection, converted);
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
