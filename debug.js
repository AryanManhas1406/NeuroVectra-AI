// ─────────────────────────────────────────────────────────────
// DROP THIS FILE in your project root and run: node debug-test.js
// It will tell you EXACTLY where the pipeline breaks.
// ─────────────────────────────────────────────────────────────

require("dotenv").config();

const extractTextFromPDF = require("./src/utils/pdfParser");
const chunkText          = require("./src/utils/chunkText");
const createEmbedding    = require("./src/modules/document/embedding.service");

// ✅ PUT THE PATH TO ANY REAL PDF ON YOUR MACHINE HERE
const TEST_PDF_PATH = "./test.pdf";

(async () => {
    console.log("\n==============================");
    console.log("STEP 1 — PDF Extraction");
    console.log("==============================");
    const text = await extractTextFromPDF(TEST_PDF_PATH);
    console.log("Extracted length :", text?.length ?? 0);
    console.log("First 300 chars  :", text?.slice(0, 300));

    if (!text || text.trim().length === 0) {
        console.error("❌ FAIL: extractTextFromPDF returned empty text. Fix your pdfParser.");
        process.exit(1);
    }
    console.log("✅ PASS\n");

    console.log("==============================");
    console.log("STEP 2 — Text Chunking");
    console.log("==============================");
    const chunks = chunkText(text);
    console.log("Chunk count      :", chunks.length);
    console.log("First chunk      :", chunks[0]?.slice(0, 200));

    if (!chunks || chunks.length === 0) {
        console.error("❌ FAIL: chunkText returned 0 chunks. Fix your chunkText utility.");
        process.exit(1);
    }
    console.log("✅ PASS\n");

    console.log("==============================");
    console.log("STEP 3 — Embedding (first chunk only)");
    console.log("==============================");
    const embedding = await createEmbedding(chunks[0]);
    console.log("Embedding type   :", typeof embedding);
    console.log("Is array         :", Array.isArray(embedding));
    console.log("Dimension        :", embedding?.length ?? "N/A");
    console.log("First 5 values   :", embedding?.slice(0, 5));

    if (!Array.isArray(embedding) || embedding.length === 0) {
        console.error("❌ FAIL: createEmbedding did not return a valid float array.");
        process.exit(1);
    }
    console.log("✅ PASS\n");

    console.log("==============================");
    console.log("ALL STEPS PASSED ✅");
    console.log("==============================\n");
})();