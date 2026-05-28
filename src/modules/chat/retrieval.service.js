// const chroma =
// require("../../config/chroma.config");

// const createEmbedding =
// require("../document/embedding.service");

// const retrieveRelevantChunks =
// async (question) => {

//     // Generate embedding
//     const queryEmbedding =
//     await createEmbedding(question);

//     // Get collection
//     const collection =
//     await chroma.getCollection({
//         name: "documents_v2"
//     });

//     // Similarity search
//     const results =
//     await collection.query({

//         queryEmbeddings: [
//             queryEmbedding
//         ],

//         nResults: 5
//     });

//     return results.documents[0];
// };

// module.exports =
// retrieveRelevantChunks;
const pinecone =
require("../../config/pinecone.config");

const createEmbedding =
require("../document/embedding.service");

const index =
pinecone.index(
    process.env.PINECONE_INDEX
);

const retrieveRelevantChunks =
async (question) => {

    const queryEmbedding =
    await createEmbedding(question);

    const results =
    await index.query({

        vector:
        queryEmbedding,

        topK: 5,

        includeMetadata: true
    });

    return results.matches.map(

        (match) =>
        match.metadata.text
    );
};

module.exports =
retrieveRelevantChunks;