// const express = require("express");

// const router =
// express.Router();

// const protect =
// require("../../middleware/auth.middleware");

// const {
//     askQuestion
// } = require(
//     "./chat.controller"
// );

// router.post(
//     "/ask",
//     protect,
//     askQuestion
// );

// module.exports = router;
const express = require("express");

const router = express.Router();

const protect =
require("../../middleware/auth.middleware");

const {
    askQuestion
} = require("./chat.controller");


/**
 * @swagger
 * /api/chat/ask:
 *   post:
 *     summary: Ask AI questions from uploaded documents
 *     description: Ask questions based on uploaded PDF documents using RAG AI system
 *     tags: [Chat]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - question
 *               - documentId
 *
 *             properties:
 *               question:
 *                 type: string
 *                 example: What is machine learning?
 *
 *               documentId:
 *                 type: string
 *                 example: 6857ab34cd98ef12
 *
 *     responses:
 *       200:
 *         description: AI response generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 answer:
 *                   type: string
 *                   example: Machine learning is a subset of artificial intelligence that enables systems to learn from data.
 *
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 message:
 *                   type: string
 *                   example: Question is required
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Document not found
 *
 *       500:
 *         description: Internal server error
 */
router.post(
    "/ask",
    protect,
    askQuestion
);

module.exports = router;