const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const repository = require("./auth.repository");

const {
    generateAccessToken,
    generateRefreshToken
} = require("../../config/jwt");

exports.login = async (
    email,
    password,
    deviceInfo,
    ipAddress
) => {

    const user = await repository.login(email);

    if (!user) {
        throw new Error("Invalid Email");
    }

    const validPassword = await bcrypt.compare(
        password,
        user.PasswordHash
    );

    if (!validPassword) {
        throw new Error("Invalid Password");
    }

    // STEP 1: get permissions from DB
    const permissionsResult =
        await repository.getRolePermissions(user.Role);

    const permissions =
        permissionsResult.map(x => x.ModuleName);

    // STEP 2: FINAL PAYLOAD (THIS IS IMPORTANT)
    const payload = {
        userId: user.UserId,
        role: user.Role,
        permissions
    };

    // STEP 3: tokens
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const expiry = new Date(
        Date.now() + 90 * 24 * 60 * 60 * 1000
    );

    await repository.saveRefreshToken(
        user.UserId,
        refreshToken,
        expiry,
        deviceInfo
    );

    await repository.saveLoginHistory(
        user.UserId,
        ipAddress,
        deviceInfo
    );

    // STEP 4: RETURN RESPONSE (YOU WERE MISSING THIS)
    return {
        accessToken,
        refreshToken,
        user: {
            ...user,
            permissions
        }
    };
};

exports.refreshToken = async (token) => {

    const decoded = jwt.verify(
        token,
        process.env.REFRESH_SECRET
    );

    const session = await repository.getRefreshToken(token);

    if (!session) {
        throw new Error("Session Expired");
    }

    // get permissions again from DB
    const permissionsResult =
        await repository.getRolePermissions(decoded.role);

    const permissions =
        permissionsResult.map(x => x.ModuleName);

    const payload = {
        userId: decoded.userId,
        role: decoded.role,
        permissions
    };

    const accessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    await repository.rotateRefreshToken(
        token,
        newRefreshToken
    );

    return {
        accessToken,
        refreshToken: newRefreshToken
    };
};

exports.logout = async (token) => {
    await repository.deleteRefreshToken(token);
};

exports.createUser = async (creator, data) => {

    const role = data.role;

    if (creator.role === "SUPER_ADMIN") {

        if (role !== "SOCIETY_ADMIN") {
            throw new Error(
                "SUPER_ADMIN can only create SOCIETY_ADMIN"
            );
        }
    }

    else if (creator.role === "SOCIETY_ADMIN") {

        const allowedRoles = [
            "COMMITTEE_MEMBER",
            "TREASURER",
            "SECURITY_ADMIN",
            "NORMAL_ADMIN"
        ];

        if (!allowedRoles.includes(role)) {
            throw new Error("Invalid Role");
        }
    }

    else {
        throw new Error("No Permission");
    }

    const existingUser =
        await repository.getAdminByEmail(
            data.email
        );

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword =
        await bcrypt.hash(data.password, 10);

    return repository.createUser({
        ...data,
        passwordHash: hashedPassword,
        createdBy: creator.userId
    });
};