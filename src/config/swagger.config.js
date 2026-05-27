// const swaggerJsDoc = require("swagger-jsdoc");

// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "Test API",
//             version: "1.0.0"
//         },
//         components: {
//     securitySchemes: {

//         bearerAuth: {
//             type: "http",
//             scheme: "bearer",
//             bearerFormat: "JWT"
//         }
//     }
// },

// security: [
//     {
//         bearerAuth: []
//     }
// ]
//     },

//     apis: ["./modules/auth/auth.routes.js"]
// };

// const swaggerSpec = swaggerJsDoc(options);

// console.log(
//     JSON.stringify(swaggerSpec.paths, null, 2)
// );

// module.exports = swaggerSpec;
// 
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "AI RAG Chatbot API",
            version: "1.0.0",
            description: "AI-powered RAG backend"
        },

        servers: [
            {
                url: "http://localhost:5000",
                description: "Local Server"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },

        security: [
            {
                bearerAuth: []
            }
        ],

        tags: [
            {
                name: "Auth",
                description: "Authentication APIs"
            },
            {
                name: "Document",
                description: "Document upload APIs"
            },
            {
                name: "Chat",
                description: "AI chat APIs"
            },
            {
                name: "Health",
                description: "Server health APIs"
            }
        ]
    },

    // ✅ FIX: use absolute paths so it works regardless of where node is run from
    apis: [
    ("./modules/auth/auth.routes.js"),
        ("./modules/document/document.routes.js"),
        ("./modules/chat/chat.route.js"),
        
    ]
};

const swaggerSpec = swaggerJsDoc(options);

// DEBUG: remove after confirming
console.log("✅ Swagger paths found:", JSON.stringify(swaggerSpec.paths, null, 2));

module.exports = swaggerSpec;
