const client =
require("../../config/openrouter.config");

const generateAIResponse =
async ({
    question,
    context
}) => {

    const prompt = `

You are an AI assistant.

Answer ONLY from the provided context.

If answer is not found,
say:
"I could not find relevant information."

Context:
${context}

Question:
${question}

`;

    const completion =
    await client.chat.completions.create({

        model:
        "openai/gpt-oss-20b:free",

        messages: [
            {
                role: "user",
                content: prompt
            }
        ]
    });

    return completion
    .choices[0]
    .message
    .content;
};

module.exports =
generateAIResponse;