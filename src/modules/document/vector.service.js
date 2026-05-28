// // const pinecone =
// // require("../../config/pinecone.config");

// // const index =
// // pinecone.index(
// //     process.env.PINECONE_INDEX
// // );

// // const storeVectors =
// // async ({
// //     chunks,
// //     embeddings,
// //     documentId
// // }) => {

// //     const vectors =
// //     chunks.map(

// //         (chunk, indexNumber) => ({

// //             id:
// //             `${documentId}-${indexNumber}`,

// //             values:
// //             embeddings[indexNumber],

// //             metadata: {

// //                 text: chunk,

// //                 documentId
// //             }
// //         })
// //     );

// //     console.log(
// //         "VECTOR COUNT:",
// //         vectors.length
// //     );

// //     console.log(
// //         "FIRST VECTOR:"
// //     );

// //     console.log(vectors[0]);

// //     if (vectors.length === 0) {

// //         throw new Error(
// //             "No vectors generated"
// //         );
// //     }

// //     await index.upsert(vectors);

// //     console.log(
// //         "Vectors stored successfully"
// //     );
// // };

// // module.exports =
// // storeVectors;
// const pinecone = require("../../config/pinecone.config");

// const index = pinecone.index(process.env.PINECONE_INDEX);

// const storeVectors = async ({ chunks, embeddings, documentId }) => {

//     // ✅ Guard: chunks must exist
//     if (!chunks || chunks.length === 0) {
//         throw new Error("storeVectors: chunks array is empty or undefined.");
//     }

//     // ✅ Guard: embeddings must exist and match chunks
//     if (!embeddings || embeddings.length === 0) {
//         throw new Error("storeVectors: embeddings array is empty or undefined.");
//     }

//     if (embeddings.length !== chunks.length) {
//         throw new Error(
//             `storeVectors: mismatch — ${chunks.length} chunks but ${embeddings.length} embeddings.`
//         );
//     }

//     // ✅ Normalize embeddings: handle both raw arrays and objects like { values: [...] }
//     const normalizedEmbeddings = embeddings.map((emb, i) => {
//         if (Array.isArray(emb)) return emb;                  // already a flat array
//         if (emb && Array.isArray(emb.values)) return emb.values; // OpenAI-style { values: [...] }
//         if (emb && Array.isArray(emb.embedding)) return emb.embedding; // some SDKs use .embedding
//         throw new Error(
//             `storeVectors: embedding at index ${i} is not a valid array. Got: ${JSON.stringify(emb)?.slice(0, 100)}`
//         );
//     });

//     // ✅ Guard: none of the embedding vectors should be empty
//     normalizedEmbeddings.forEach((vec, i) => {
//         if (!vec || vec.length === 0) {
//             throw new Error(`storeVectors: embedding vector at index ${i} is empty.`);
//         }
//     });

//     // ✅ Build Pinecone vector objects
//     const vectors = chunks.map((chunk, indexNumber) => ({
//         id: `${documentId}-${indexNumber}`,
//         values: normalizedEmbeddings[indexNumber],
//         metadata: {
//             text: chunk,
//             documentId
//         }
//     }));

//     console.log(`[storeVectors] Upserting ${vectors.length} vectors for document: ${documentId}`);
//     console.log("[storeVectors] Sample vector id:", vectors[0]?.id);
//     console.log("[storeVectors] Sample vector dimension:", vectors[0]?.values?.length);

//     await index.upsert(vectors);

//     console.log("[storeVectors] ✅ Vectors stored successfully.");
// };

// module.exports = storeVectors;
// const pinecone =
// require("../../config/pinecone.config");

// const index =
// pinecone.index(
//     process.env.PINECONE_INDEX
// );

// const storeVectors =
// async ({
//     chunks,
//     embeddings,
//     documentId
// }) => {

//     const vectors =
//     chunks.map(

//         (chunk, indexNumber) => ({

//             id:
//             `${documentId}-${indexNumber}`,

//             values:
//             Array.from(
//                 embeddings[indexNumber]
//             ),

//             metadata: {

//                 text: chunk,

//                 documentId
//             }
//         })
//     );

//     console.log(
//         "VECTOR COUNT:",
//         vectors.length
//     );

//     console.log(
//         "FIRST VECTOR:"
//     );

//     console.log(vectors[0]);

//     await index.upsert(vectors);

//     console.log(
//         "Vectors stored successfully"
//     );
// };

// module.exports =
// storeVectors;
// const pinecone =
// require("../../config/pinecone.config");

// const index =
// pinecone.index(
//     process.env.PINECONE_INDEX
// );

// const storeVectors =
// async ({
//     chunks,
//     embeddings,
//     documentId
// }) => {

//     console.log(
//         "RAW EMBEDDINGS:"
//     );

//     console.log(
//         embeddings
//     );

//     console.log(
//         "FIRST EMBEDDING TYPE:"
//     );

//     console.log(
//         typeof embeddings[0]
//     );

//     console.log(
//         "IS ARRAY:"
//     );

//     console.log(
//         Array.isArray(
//             embeddings[0]
//         )
//     );

//     console.log(
//         "FIRST EMBEDDING LENGTH:"
//     );

//     console.log(
//         embeddings[0]?.length
//     );

//     const vectors =
//     chunks.map(

//         (chunk, indexNumber) => ({

//             id:
//             `${documentId}-${indexNumber}`,

//             values:
//             Array.from(
//                 embeddings[indexNumber]
//             ),

//             metadata: {

//                 text: chunk,

//                 documentId
//             }
//         })
//     );

//     console.log(
//         "FINAL VECTORS:"
//     );

//     console.log(
//         JSON.stringify(
//             vectors[0],
//             null,
//             2
//         )
//     );

//     console.log(
//         "VECTOR COUNT:"
//     );

//     console.log(
//         vectors.length
//     );

//     await index.upsert({

//     vectors: vectors
// });
//     console.log(
//         "Vectors stored successfully"
//     );
// };

// module.exports =
// storeVectors;
const pinecone = require("../../config/pinecone.config");

const index = pinecone.index(process.env.PINECONE_INDEX);

const storeVectors = async ({ chunks, embeddings, documentId }) => {

    if (!chunks || chunks.length === 0) {
        throw new Error("storeVectors: chunks array is empty.");
    }
    if (!embeddings || embeddings.length === 0) {
        throw new Error("storeVectors: embeddings array is empty.");
    }
    if (embeddings.length !== chunks.length) {
        throw new Error(`storeVectors: mismatch — ${chunks.length} chunks but ${embeddings.length} embeddings.`);
    }

    const normalizedEmbeddings = embeddings.map((emb, i) => {
        if (Array.isArray(emb)) return emb;
        if (emb && Array.isArray(emb.values)) return emb.values;
        if (emb && Array.isArray(emb.embedding)) return emb.embedding;
        throw new Error(`storeVectors: invalid embedding at index ${i}`);
    });

    const records = chunks.map((chunk, i) => ({
        id: `${documentId}-${i}`,
        values: normalizedEmbeddings[i],
        metadata: { text: chunk, documentId }
    }));

    console.log(`[storeVectors] Upserting ${records.length} records, dimension: ${records[0].values.length}`);

    // ✅ NEW SDK requires: index.upsert({ records: [...] })
    // OLD SDK used:        index.upsert([...])
    await index.upsert({ records });

    console.log("[storeVectors] ✅ Vectors stored successfully.");
};

module.exports = storeVectors;