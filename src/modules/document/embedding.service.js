// const openai = require("../../config/openAI.config");
// const chroma = require("../../config/chroma.config");
// const chunkText = require("../../utils/chunkText");

// const createEmbeddingsService = async (documentId,text) =>{
//     const chunks = chunkText(text);
//     const embeddings = [];
//     for (const chunk of chunks) {
//         const response = await openai.embeddings.create({
//             model: "text-embedding-3-small",
//             input:chunk
//         });
//         embeddings.push({
//             documentId,
//             chunk,
//             embedding:response.data[0].embedding
//         })
//         }
//     }
// optimized way 
const { pipeline } =
require("@xenova/transformers");

let extractor;

const createEmbedding =
async (text) => {

    if (!extractor) {

        extractor =
        await pipeline(
            "feature-extraction",
            "Xenova/all-MiniLM-L6-v2"
        );
    }

    const output =
    await extractor(text, {

        pooling: "mean",
        normalize: true
    });

    return Array.from(output.data);
};

module.exports =
createEmbedding;