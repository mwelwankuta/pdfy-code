# PDFyCode

Convert your highlighted code in Visual Studio Code to a PDF file with ease using this extension.

![Image](https://github.com/mwelwankuta/pdfy-code/blob/main/assets/image.png)

## Features

- Convert highlighted code in the active editor to a PDF file.
- Choose the font size, line height, and page orientation for the PDF output.
- Customize the PDF file name and save location.

## Requirements

- Visual Studio Code version 1.60.0 or higher.

## Installation

1. Open **Visual Studio Code**.
2. Go to the **Extensions** view by clicking on the square icon in the sidebar.
3. Search for **Highlighted Code to PDF**.
4. Click **Install** to install the extension.
5. Once installed, click **Reload** to activate the extension.
6. Run the following command in your terminal to install Puppeteer and Chrome:

   ```bash
   npx puppeteer browsers install chrome
   ```

## Usage

- **Method 1: Context Menu**

  1. Highlight the code you want to convert to a PDF file in the active editor.
  2. Right-click on the highlighted code.
  3. Select **Convert to PDF** from the context menu.
  4. Choose the desired options such as font size, line height, page orientation, file name, and save location in the dialog box.
  5. Click **Save** to generate the PDF file.

- **Method 2: Command Palette**
  1. Highlight the code you want to convert to a PDF file in the active editor.
  2. Press `Ctrl + Shift + P` to open the Command Palette.
  3. Type "Convert to PDF" and select it from the list.
  4. Choose the desired options such as font size, line height, page orientation, file name, and save location in the dialog box.
  5. Click **Save** to generate the PDF file.

## Release Notes

### 0.0.5

Initial release of Highlighted Code to PDF extension.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue on [GitHub](https://github.com/mwelwankuta/pdfycode).

## License

This extension is licensed under the [MIT License](LICENSE).
