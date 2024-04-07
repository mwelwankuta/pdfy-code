const { mdToPdf } = require("md-to-pdf");

const vscode = require("vscode");
const fs = require("fs");

function textToMD(text, language) {
  return `\`\`\`${language}\n${text}\`\`\``;
}

async function save(text, language) {
  const md = textToMD(text, language);

  const options = {
    saveLabel: "Save",
    filters: {
      "PDF Files": ["pdf"],
    },
  };

  const uri = await vscode.window.showSaveDialog(options);

  if (uri) {
    const filePath = uri.fsPath;
    try {
      const { content, filename } = await mdToPdf(
        { content: md },
        { dest: filePath + ".pdf" }
      );

      vscode.window.showInformationMessage(filePath + ".pdf");
      fs.writeFileSync(filename, content);
    } catch (error) {
      vscode.window.showInformationMessage(
        "An error occurred: Could not convert to pdf \n" + error
      );
    }
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
  });
  context.subscriptions.push(cmd);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
