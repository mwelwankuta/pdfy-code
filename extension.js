const vscode = require('vscode');
const fs = require("fs")
const path = require("path")

function textToMD(text, language) {
	return `\`\`\`${language}\n${text}\`\`\``;
}

async function save(text, language) {
	const md = textToMD(text, language);
	const cwd = process.cwd()
	const dir = path.join(cwd, "out.md")
	
	// test
	await fs.promises.writeFile(dir, md);
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
