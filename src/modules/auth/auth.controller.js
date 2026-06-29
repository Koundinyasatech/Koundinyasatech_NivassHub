const authService = require("./auth.service");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const deviceInfo =
            req.headers["user-agent"];

        const ipAddress =
            req.headers["x-forwarded-for"] ||
            req.socket.remoteAddress;

        const result =
            await authService.login(
                email,
                password,
                deviceInfo,
                ipAddress
            );

        res.cookie("refreshToken",
            result.refreshToken,
            {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV ===
                    "production",
                sameSite: "strict",
                maxAge:
                    90 * 24 * 60 * 60 * 1000
            }
        );

        return res.status(200).json({
            success: true,
            accessToken:
                result.accessToken,
            user: result.user
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        const result = await authService.refreshToken(token);

        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 90 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            accessToken: result.accessToken
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

exports.logout = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        await authService.logout(token);

        res.clearCookie("refreshToken");

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.createUser = async (req, res) => {
    try {
        const result = await authService.createUser(
            req.user,
            req.body
        );

        return res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};