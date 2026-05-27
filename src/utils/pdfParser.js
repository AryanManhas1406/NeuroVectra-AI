const fs = require("fs");

const pdfjsLib =
require("pdfjs-dist/legacy/build/pdf.mjs");

const extractTextFromPDF =
async (filePath) => {

    try {

        const data =
        new Uint8Array(
            fs.readFileSync(filePath)
        );

        const pdf =
        await pdfjsLib
        .getDocument({ data })
        .promise;

        let text = "";

        for (
            let i = 1;
            i <= pdf.numPages;
            i++
        ) {

            const page =
            await pdf.getPage(i);

            const content =
            await page.getTextContent();

            const strings =
            content.items.map(
                item => item.str
            );

            text +=
            strings.join(" ");
        }

        return text;

    } catch (error) {

        console.log(
            "PDF EXTRACT ERROR : ",
            error
        );

        throw new Error(
            "Failed to extract PDF text"
        );
    }
};

module.exports =
extractTextFromPDF;