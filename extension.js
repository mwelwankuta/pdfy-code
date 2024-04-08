const { mdToPdf } = require("md-to-pdf");
const vscode = require("vscode");
const fs = require("fs");

/**
 * turns code snippet into markdown code snippet
 * @param {string} content  - content
 * @param {string} language - file/language extension
 * @returns {string} string as markdown code embed
 */
function textToMD(content, language) {
  return `\`\`\`${language}\n${content}\n`;
}

function shouldIncludePdfExtension(filepath) {
  if (filepath.includes(".pdf")) return filepath;

  return filepath + ".pdf";
}

function getFilePath(filePathWithExtension) {
  const filePath = filePathWithExtension.split(".");
  filePath.pop();
  return filePath.join(".");
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

  if (!uri) {
    vscode.window.showWarningMessage(
      "A file path is required to save the PDF file."
    );
    return;
  }

  const filePath = uri.fsPath;
  try {
    const { content, filename } = await mdToPdf(
      { content: md },
      { dest: shouldIncludePdfExtension(filePath) }
    );

    const showInExplorerButton = { title: "Open in explorer" };

    const shouldOpenInExplorer = await vscode.window.showInformationMessage(
      "File saved to: " + filePath,
      showInExplorerButton
    );

    if (shouldOpenInExplorer === showInExplorerButton)
      vscode.commands.executeCommand(
        "revealFileInOS",
        vscode.Uri.file(getFilePath(filename))
      );

    fs.writeFileSync(filename, content);
  } catch (error) {
    vscode.window.showErrorMessage(
      "An error occurred: Could not convert to pdf \n" + error
    );
  }
}

function activate(context) {
  const otherCmd = vscode.commands.registerCommand("pdfycode.isInstalled", () => {
    vscode.window.showInformationMessage("PDFyCode is installed");
  })

  context.subscriptions.push(otherCmd)
  const cmd = vscode.commands.registerCommand("pdfycode.code2pdf", () => {
    const ed = vscode.window.activeTextEditor;

    if (!ed) return;

    const selection = ed.selection;

    if (!selection.isEmpty) {
      const fileName = ed.document.fileName;
      const selectedText = ed.document.getText(selection);

      const lang = fileName.split(".").pop();

      save(selectedText, lang);
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
