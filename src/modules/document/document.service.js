const Document = require("./document.model");
const extractTextFromPDF = require("../../utils/pdfParser");
const chunkText = require("../../utils/chunkText");
const createEmbedding = require("./embedding.service");
const storeVectors = require("./vector.service");

const uploadDocumentService = async ({ file, userId }) => {

    // ✅ Guard: file must exist
    if (!file) {
        throw new Error("No file uploaded");
    }

    // ── Step 1: Extract text from PDF ──────────────────────────────────────
    console.log("[uploadDocumentService] Extracting text from:", file.path);
    const extractedText = await extractTextFromPDF(file.path);

    if (!extractedText || extractedText.trim().length === 0) {
        throw new Error(
            "PDF text extraction returned empty content. " +
            "The PDF may be scanned/image-based or password-protected."
        );
    }

    console.log(`[uploadDocumentService] Extracted ${extractedText.length} characters.`);

    // ── Step 2: Save document to MongoDB ───────────────────────────────────
    const document = await Document.create({
        user: userId,
        originalName: file.originalname,
        filePath: file.path,
        extractedText
    });

    console.log("[uploadDocumentService] Document saved:", document._id.toString());

    // ── Step 3: Chunk text ─────────────────────────────────────────────────
    const chunks = chunkText(extractedText);

    console.log(`[uploadDocumentService] Chunks generated: ${chunks.length}`);

    if (!chunks || chunks.length === 0) {
        throw new Error(
            "chunkText returned no chunks. Check your chunk size and overlap settings."
        );
    }

    // ── Step 4: Generate embeddings ────────────────────────────────────────
    console.log("[uploadDocumentService] Generating embeddings...");

    const embeddings = await Promise.all(
        chunks.map(async (chunk, i) => {
            const embedding = await createEmbedding(chunk);

            // ✅ Validate each embedding right after creation
            if (!embedding) {
                throw new Error(`createEmbedding returned null/undefined for chunk ${i}`);
            }

            // Normalize in place so downstream code gets a plain array
            if (Array.isArray(embedding)) return embedding;
            if (Array.isArray(embedding.values)) return embedding.values;
            if (Array.isArray(embedding.embedding)) return embedding.embedding;

            throw new Error(
                `createEmbedding returned an unexpected shape for chunk ${i}: ` +
                JSON.stringify(embedding)?.slice(0, 150)
            );
        })
    );

    console.log(`[uploadDocumentService] Embeddings generated: ${embeddings.length}`);
    console.log(`[uploadDocumentService] Embedding dimension: ${embeddings[0]?.length}`);

    // ── Step 5: Store vectors in Pinecone ──────────────────────────────────
    await storeVectors({
        chunks,
        embeddings,
        documentId: document._id.toString()
    });

    console.log("[uploadDocumentService] ✅ Upload complete for document:", document._id);

    return document;
};

module.exports = { uploadDocumentService };