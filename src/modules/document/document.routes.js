// const express = require("express");

// const router =
// express.Router();

// const protect =
// require("../../middleware/auth.middleware");

// const upload =
// require("../../config/multer.config");

// const {

//     uploadDocument

// } = require(
//     "./document.controller"
// );

// router.post(

//     "/upload",

//     protect,

//     upload.single("pdf"),

//     uploadDocument
// );

// module.exports = router;
const express = require("express");

const router = express.Router();

const protect =
require("../../middleware/auth.middleware");

const upload =
require("../../config/multer.config");

const {
    uploadDocument
} = require("./document.controller");


/**
 * @swagger
 * /api/document/upload:
 *   post:
 *     summary: Upload PDF document
 *     description: Upload a PDF document for AI processing and vector storage
 *     tags: [Document]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - pdf
 *
 *             properties:
 *               pdf:
 *                 type: string
 *                 format: binary
 *                 description: PDF file to upload
 *
 *     responses:
 *       200:
 *         description: Document uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 message:
 *                   type: string
 *                   example: Document uploaded successfully
 *
 *                 documentId:
 *                   type: string
 *                   example: 6857ab34cd98ef12
 *
 *       400:
 *         description: No file uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 message:
 *                   type: string
 *                   example: PDF file is required
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal server error
 */
router.post(

    "/upload",

    protect,

    upload.single("pdf"),

    uploadDocument
);

module.exports = router;