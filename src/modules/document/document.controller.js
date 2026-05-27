// // 
// const {
//     uploadDocumentService
// } = require("./document.service");

// const uploadDocument =
// async (req, res) => {

//     try {

//         console.log(req.user);

//         const document =
//         await uploadDocumentService({

//             file: req.file,

//             userId:
//             req.user._id
//         });

//         res.status(201).json({

//             success: true,

//             message:
//             "Document uploaded successfully",

//             document
//         });

//     } catch (error) {

//         console.log(
//             "CONTROLLER ERROR : ",
//             error
//         );

//         res.status(500).json({

//             success: false,

//             message:
//             error.message
//         });
//     }
// };

// module.exports = {
//     uploadDocument
// };
const {
    uploadDocumentService
} = require("./document.service");

const uploadDocument =
async (req, res) => {

    try {

        console.log(
            "REQ USER : ",
            req.user
        );

        console.log(
            "REQ FILE : ",
            req.file
        );

        const userId =
        req.user.id;

        console.log(
            "USER ID : ",
            userId
        );

        const document =
        await uploadDocumentService({

            file: req.file,

            userId
        });

        res.status(201).json({

            success: true,

            message:
            "Document uploaded successfully",

            document
        });

    } catch (error) {

        console.log(
            "CONTROLLER ERROR : ",
            error
        );

        res.status(500).json({

            success: false,

            message:
            error.message
        });
    }
};

module.exports = {
    uploadDocument
};