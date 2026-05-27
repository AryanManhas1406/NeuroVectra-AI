const {
    ChromaClient
} = require("chromadb");

const chroma =
new ChromaClient({
    path : "http://localhost:8000"
});

module.exports =
chroma;