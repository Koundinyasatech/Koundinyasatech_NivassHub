const { sql, poolPromise } = require("../../config/db");

exports.login = async (email) => {
    const pool = await poolPromise;

    const result = await pool
        .request()
        .input("Email", sql.NVarChar, email)
        .execute("USP_ADMIN_LOGIN");

    return result.recordset[0];
};

exports.getAdminByEmail = async (email) => {
    const pool = await poolPromise;

    const result = await pool
        .request()
        .input("Email", sql.NVarChar, email)
        .execute("USP_GET_ADMIN_BY_EMAIL");

    return result.recordset[0];
};

exports.createUser = async (data) => {
    const pool = await poolPromise;

    const result = await pool
        .request()
        .input("FirstName", sql.NVarChar, data.firstName)
        .input("LastName", sql.NVarChar, data.lastName)
        .input("Email", sql.NVarChar, data.email)
        .input("MobileNumber", sql.NVarChar, data.mobileNumber)
        .input("PasswordHash", sql.NVarChar, data.passwordHash)
        .input("Role", sql.NVarChar, data.role)
        .input("CreatedBy", sql.Int, data.createdBy)
        .execute("USP_CREATE_USER");

    return result.recordset[0];
};

exports.saveRefreshToken = async (
    userId,
    token,
    expiresAt,
    deviceInfo
) => {
    const pool = await poolPromise;

    await pool
        .request()
        .input("UserId", sql.Int, userId)
        .input("RefreshToken", sql.NVarChar, token)
        .input("ExpiresAt", sql.DateTime, expiresAt)
        .input("DeviceInfo", sql.NVarChar, deviceInfo)
        .execute("USP_SAVE_REFRESH_TOKEN");
};

exports.getRefreshToken = async (token) => {
    const pool = await poolPromise;

    const result = await pool
        .request()
        .input("RefreshToken", sql.NVarChar, token)
        .execute("USP_GET_REFRESH_TOKEN");

    return result.recordset[0];
};

exports.rotateRefreshToken = async (oldToken, newToken) => {
    const pool = await poolPromise;

    await pool
        .request()
        .input("OldToken", sql.NVarChar, oldToken)
        .input("NewToken", sql.NVarChar, newToken)
        .execute("USP_ROTATE_REFRESH_TOKEN");
};

exports.deleteRefreshToken = async (token) => {
    const pool = await poolPromise;

    await pool
        .request()
        .input("RefreshToken", sql.NVarChar, token)
        .execute("USP_DELETE_REFRESH_TOKEN");
};
exports.saveLoginHistory = async (
    userId,
    ipAddress,
    deviceInfo
) => {
    const pool = await poolPromise;

    await pool
        .request()
        .input("UserId", sql.Int, userId)
        .input("IPAddress", sql.NVarChar, ipAddress)
        .input("DeviceInfo", sql.NVarChar, deviceInfo)
        .execute("USP_SAVE_LOGIN_HISTORY");
};

exports.getRolePermissions = async (role) => {

    const pool = await poolPromise;

    const result = await pool
        .request()
        .input("Role", sql.NVarChar, role)
        .execute("USP_GET_ROLE_PERMISSIONS");

    return result.recordset;
};