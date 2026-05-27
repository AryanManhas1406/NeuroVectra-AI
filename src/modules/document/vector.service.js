const chroma =
require("../../config/chroma.config");

const storeVectors =
async ({
    chunks,
    embeddings,
    documentId
}) => {

    let collection;

    try {

        collection =
        await chroma.getCollection({
            name: "documents_v2"
        });

    } catch {

        collection =
        await chroma.createCollection({
            name: "documents_v2"
        });
    }

    await collection.add({

        ids:
        chunks.map(
            (_, index) =>
            `${documentId}-${index}`
        ),

        documents: chunks,

        embeddings: embeddings
    });
};

module.exports =
storeVectors;