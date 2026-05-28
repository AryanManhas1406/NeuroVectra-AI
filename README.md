# NeuroVectra-AI

AI-Powered Retrieval-Augmented Generation (RAG) Platform using OpenRouter LLMs, Pinecone Vector Database, Semantic Search, and Local Embeddings.

---

# Overview

NeuroVectra-AI is a scalable AI-powered RAG backend platform designed for intelligent document-based question answering using semantic vector search and large language models.

The platform enables users to:

* Upload documents
* Generate semantic embeddings
* Store vectors in Pinecone
* Retrieve relevant contextual information
* Generate AI-powered responses using OpenRouter LLMs

This project demonstrates a production-style AI backend architecture suitable for enterprise search systems, AI assistants, and knowledge retrieval applications.

---

# Features

* AI-powered Retrieval-Augmented Generation (RAG)
* Semantic vector search
* Pinecone vector database integration
* OpenRouter LLM integration
* Local embedding generation using Xenova Transformers
* Intelligent document question answering
* Authentication and authorization APIs
* Swagger/OpenAPI documentation
* RESTful API architecture
* Modular backend structure
* Cloud deployment support
* Production-ready backend design

---

# Tech Stack

## Backend

* Node.js
* Express.js

## AI & NLP

* OpenRouter API
* Xenova Transformers
* Semantic Embeddings

## Vector Database

* Pinecone

## Database

* MongoDB Atlas

## Documentation

* Swagger / OpenAPI

## Deployment

* Render

---

# System Architecture

```bash
User Query
     ↓
Document Retrieval
     ↓
Pinecone Semantic Search
     ↓
Relevant Context Extraction
     ↓
OpenRouter LLM
     ↓
AI Generated Response
```

---

# Project Structure

```bash
src/
│
├── config/
│
├── middleware/
│
├── modules/
│   ├── auth/
│   ├── chat/
│   └── document/
│
├── routes/
│
├── utils/
│
└── server.js
```

---

# Live Deployment

## Backend URL

https://neurovectra-ai.onrender.com

---

# API Documentation

## Swagger Documentation

https://neurovectra-ai.onrender.com/api-docs/

Swagger provides:

* Interactive API testing
* Request/response schemas
* Authentication testing
* File upload testing
* Endpoint documentation

---

# Core Functionalities

## Authentication APIs

* User Registration
* User Login
* JWT Authentication

## Document APIs

* Upload Documents
* Process Text Chunks
* Generate Embeddings
* Store Vectors in Pinecone

## Chat APIs

* Semantic Search
* Context Retrieval
* AI Response Generation
* Conversational Query Handling

## Health APIs

* Backend Status Monitoring

---

# Installation

## Clone Repository

```bash
git clone https://github.com/AryanManhas1406/NeuroVectra-AI.git
```

---

## Navigate to Project

```bash
cd NeuroVectra-AI
```

---

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

OPENROUTER_API_KEY=your_openrouter_api_key

PINECONE_API_KEY=your_pinecone_api_key

PINECONE_INDEX_NAME=your_pinecone_index_name
```

---

# Running the Project

## Development Mode

```bash
npm run dev
```

---

## Production Mode

```bash
npm start
```

---

# API Endpoints

## Authentication

```bash
POST /api/auth/register
POST /api/auth/login
```

---

## Document

```bash
POST /api/document/upload
```

---

## Chat

```bash
POST /api/chat
```

---

# RAG Workflow

1. User uploads documents
2. Documents are chunked into smaller sections
3. Semantic embeddings are generated
4. Embeddings are stored in Pinecone
5. User asks a question
6. Relevant chunks are retrieved using vector similarity search
7. Context is sent to OpenRouter LLM
8. AI-generated response is returned

---

# Deployment

The backend is deployed on Render.

Deployment includes:

* Production API hosting
* Swagger documentation hosting
* Cloud-accessible endpoints
* Environment variable configuration

---

# Future Improvements

* Streaming AI responses
* Multi-document conversations
* Conversation memory
* Role-based access control
* Docker containerization
* Kubernetes deployment
* Frontend dashboard
* PDF parsing improvements
* Real-time chat interface

---

# Author

Aryan Manhas

## GitHub

https://github.com/AryanManhas1406

---

# License

This project is licensed under the MIT License.
