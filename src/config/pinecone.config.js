const { Pinecone } = require("@pinecone-database/pinecone");

if (!process.env.PINECONE_API_KEY) {
    throw new Error("Missing PINECONE_API_KEY in environment variables.");
}

if (!process.env.PINECONE_INDEX) {
    throw new Error("Missing PINECONE_INDEX in environment variables.");
}

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});

module.exports = pinecone;