const askQuestionService =
require("./chat.service");

const askQuestion =
async (req, res) => {

    try {
const { question } =
        req.body;

        if (!question) {

            return res.status(400)
            .json({

                message:
                "Question required"
            });
        }

        const answer =
        await askQuestionService(
            question
        );

        res.status(200).json({

            success: true,

            answer
        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
            error.message
        });
    }
};

module.exports = {
    askQuestion
};