/**
 * chunkText.js  — robust text splitter for RAG pipelines
 *
 * Splits text into overlapping chunks suitable for embedding.
 * Handles edge-cases: empty input, whitespace-only text,
 * very short documents, and chunks that are too small to be useful.
 */

const CHUNK_SIZE    = 500;   // characters per chunk
const CHUNK_OVERLAP = 100;   // overlap between consecutive chunks
const MIN_CHUNK_LEN = 30;    // discard chunks shorter than this

/**
 * @param {string} text            - raw extracted text
 * @param {number} chunkSize       - max characters per chunk
 * @param {number} chunkOverlap    - overlap in characters
 * @returns {string[]}             - array of non-empty text chunks
 */
const chunkText = (
    text,
    chunkSize   = CHUNK_SIZE,
    chunkOverlap = CHUNK_OVERLAP
) => {

    // ✅ Guard: reject empty / non-string input
    if (!text || typeof text !== "string" || text.trim().length === 0) {
        console.warn("[chunkText] Received empty or invalid text.");
        return [];
    }

    // Normalize whitespace: collapse multiple newlines / spaces
    const normalized = text.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();

    const chunks = [];
    let start = 0;

    while (start < normalized.length) {

        const end   = Math.min(start + chunkSize, normalized.length);
        const chunk = normalized.slice(start, end).trim();

        // ✅ Only keep chunks that have enough meaningful content
        if (chunk.length >= MIN_CHUNK_LEN) {
            chunks.push(chunk);
        }

        // If we've reached the end of the string, stop
        if (end === normalized.length) break;

        // Advance by (chunkSize - overlap) so consecutive chunks share context
        start += chunkSize - chunkOverlap;
    }

    console.log(`[chunkText] Produced ${chunks.length} chunks from ${normalized.length} chars.`);

    return chunks;
};

module.exports = chunkText;