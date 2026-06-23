import axiosInstance from "../../services/axiosInstance";

export const loginAPI = async (payload) => {
  const response = await axiosInstance.post("/login", payload);
  return response.data;
};

export const refreshTokenAPI = async () => {
  const response = await axiosInstance.post("/auth/refresh");
  return response.data;
};

export const logoutAPI = async () => {
  const response = await axiosInstance.post("/logout");
  return response.data;
};