import axiosInstance from "../../services/axiosInstance";

export const loginAPI = async (payload) => {
  const response = await axiosInstance.post(
    "/api/auth/login",
    payload
  );
  return response.data;
};

export const refreshTokenAPI = async () => {
  const response = await axiosInstance.post(
    "/api/auth/refresh-token"
  );
  return response.data;
};

export const logoutAPI = async () => {
  const response = await axiosInstance.post(
    "/api/auth/logout"
  );
  return response.data;
};