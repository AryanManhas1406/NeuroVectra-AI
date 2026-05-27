// const path =
// require("path");

// const Document =
// require("./document.model");

// const extractTextFromPDF =
// require("../../utils/pdfParser");

// const uploadDocumentService =
// async ({
//     file,
//     userId
// }) => {

//     if (!file) {

//         throw new Error(
//             "No file uploaded"
//         );
//     }

//     const filePath =
//     path.join(
//         process.cwd(),
//         "src/uploads",
//         file.filename
//     );

//     const extractedText =
//     await extractTextFromPDF(
//         filePath
//     );

//     const document =
//     await Document.create({

//         user: userId,

//         originalName:
//         file.originalname,

//         filePath,

//         extractedText
//     });

//     return document;
// };

// module.exports = {
//     uploadDocumentService
// };
// const path = require("path");          // ✅ added
// const Document = require("./document.model");
// const extractTextFromPDF = require("../../utils/pdfParser");

// const uploadDocumentService = async ({ file, userId }) => {
//     if (!file) {
//         throw new Error("No file uploaded");
//     }

//     const filePath = path.join(
//         process.cwd(),
//         "uploads",
//         file.filename          // ✅ fixed
//     );

//     const extractedText = await extractTextFromPDF(filePath);

//     const document = await Document.create({
//         user: userId,
//         originalName: file.originalname,
//         filePath: filePath,
//         extractedText
//     });

//     return document;
// };

// module.exports = { uploadDocumentService };
const Document =
require("./document.model");

const extractTextFromPDF =
require("../../utils/pdfParser");

const chunkText =
require("../../utils/chunkText");

const createEmbedding =
require("./embedding.service");

const storeVectors =
require("./vector.service");

const uploadDocumentService =
async ({
    file,
    userId
}) => {

    if (!file) {

        throw new Error(
            "No file uploaded"
        );
    }

    // Extract PDF text
    const extractedText =
    await extractTextFromPDF(
        file.path
    );

    // Save document
    const document =
    await Document.create({

        user: userId,

        originalName:
        file.originalname,

        filePath:
        file.path,

        extractedText
    });

    // Chunk text
    const chunks =
    chunkText(extractedText);

    // Generate embeddings
    const embeddings =
    await Promise.all(

        chunks.map(

            async (chunk) => {

                return await createEmbedding(
                    chunk
                );
            }
        )
    );

    // Store vectors
    await storeVectors({

        chunks,

        embeddings,

        documentId:
        document._id.toString()
    });

    return document;
};

module.exports = {
    uploadDocumentService
};