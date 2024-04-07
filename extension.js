const vscode = require('vscode');
const fs = require("fs");

function textToMD(text, language) {
	return `\`\`\`${language}\n${text}\`\`\``;
}

async function save(text, language) {
	const md = textToMD(text, language);

	const options = {
		saveLabel: "Save",
		filters: {
			"PDF Files": ["pdf"]
		}
	}

	const uri = await vscode.window.showSaveDialog(options);

	if (uri) {
		const filePath = uri.fsPath;
		vscode.window.showInformationMessage(filePath);
		// do your thing here
		// convert the markdown to pdf and save
	}
}

function activate(context) {
	const cmd = vscode.commands.registerCommand("pdfycode.code2pdf", () => {
		const ed = vscode.window.activeTextEditor;
		if (ed) {
			const selection = ed.selection;
			if (!selection.isEmpty) {
				const selectedText = ed.document.getText(selection);
				const fileName = ed.document.fileName;
				const lang = fileName.split(".").pop();
				save(selectedText, lang);
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
