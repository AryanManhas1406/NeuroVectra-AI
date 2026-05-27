const retrieveRelevantChunks =
require("./retrieval.service");

const generateAIResponse =
require("./ai.service");

const askQuestionService =
async (question) => {

    // Retrieve relevant chunks
    const chunks =
    await retrieveRelevantChunks(
        question
    );

    // Combine chunks
    const context =
    chunks.join("\n\n");

    // Generate AI answer
    const answer =
    await generateAIResponse({

        question,
        context
    });

    return answer;
};

module.exports =
askQuestionService;