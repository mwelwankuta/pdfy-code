const vscode = require('vscode');

function activate(context) {
	const cmd = vscode.commands.registerCommand("pdfycode.code2pdf", () => {
		const ed = vscode.window.activeTextEditor;
		if (ed) {
			const selection = ed.selection;
			if (!selection.isEmpty) {
				const selectedText = ed.document.getText(selection);
				vscode.window.showInformationMessage("Selected text: " + selectedText)

				// your code here bruv
			}
		}
	})
	context.subscriptions.push(cmd)
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
