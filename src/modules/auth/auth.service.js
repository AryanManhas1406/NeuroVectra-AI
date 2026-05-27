const bcrypt = require("bcryptjs");

const User =
require("../user/user.model");

const generateToken =
require("../../utils/generateToken");

const registerUser =
async ({
    name,
    email,
    password
}) => {

    const existingUser =
    await User.findOne({ email });

    if (existingUser) {

        throw new Error(
            "User already exists"
        );
    }

    const hashedPassword =
    await bcrypt.hash(password, 10);

    const user =
    await User.create({

        name,
        email,

        password:
        hashedPassword
    });

    return {

        _id: user._id,
        email: user.email
    };
};

const loginUser =
async ({
    email,
    password
}) => {

    const user =
    await User.findOne({ email });

    if (!user) {

        throw new Error(
            "Invalid credentials"
        );
    }

    const isMatch =
    await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {

        throw new Error(
            "Invalid credentials"
        );
    }

    const token =
    generateToken(user._id);

    return {

        token,

        user: {

            id: user._id,
            name: user.name,
            email: user.email
        }
    };
};

module.exports = {

    registerUser,
    loginUser
};
// const express = require("express");

// const router = express.Router();

// /**
//  * @swagger
//  * /test:
//  *   get:
//  *     summary: Test route
//  *     responses:
//  *       200:
//  *         description: Success
//  */
// router.get("/test", (req, res) => {
//     res.send("Working");
// });

// module.exports = router;