/**
 * pdfParser.js — extracts plain text from a PDF file path
 *
 * Requires pdf-parse v1.x  →  npm install pdf-parse@1.1.1
 */

const fs       = require("fs");
const pdfParse = require("pdf-parse"); // v1.x exports a plain function

/**
 * @param {string} filePath  - absolute or relative path to the PDF
 * @returns {Promise<string>} - extracted plain text
 */
const extractTextFromPDF = async (filePath) => {

    if (!fs.existsSync(filePath)) {
        throw new Error(`extractTextFromPDF: file not found at path "${filePath}"`);
    }

    const buffer = fs.readFileSync(filePath);
    const data   = await pdfParse(buffer);
    const text   = data?.text?.trim() ?? "";

    if (text.length === 0) {
        throw new Error(
            `extractTextFromPDF: no text extracted from "${filePath}". ` +
            "The PDF may be scanned (image-only) or password-protected."
        );
    }

    console.log(
        `[extractTextFromPDF] Extracted ${text.length} characters from "${filePath}".`
    );

    return text;
};

module.exports = extractTextFromPDF;