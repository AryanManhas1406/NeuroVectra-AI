const chroma =
require("../../config/chroma.config");

const createEmbedding =
require("../document/embedding.service");

const retrieveRelevantChunks =
async (question) => {

    // Generate embedding
    const queryEmbedding =
    await createEmbedding(question);

    // Get collection
    const collection =
    await chroma.getCollection({
        name: "documents_v2"
    });

    // Similarity search
    const results =
    await collection.query({

        queryEmbeddings: [
            queryEmbedding
        ],

        nResults: 5
    });

    return results.documents[0];
};

module.exports =
retrieveRelevantChunks;