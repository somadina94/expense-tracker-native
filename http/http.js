import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
});

export const signupUser = async (data) => {
  try {
    const response = await axiosInstance({
      method: "POST",
      url: "users/signup",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axiosInstance({
      method: "POST",
      url: "users/login",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance({
      method: "POST",
      url: "users/logout",
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getMe = async (jwt) => {
  try {
    const response = await axiosInstance({
      method: "GET",
      url: "users/me",
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateMe = async (data, jwt) => {
  try {
    const response = await axiosInstance({
      method: "PATCH",
      url: "users/me",
      data,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await axiosInstance({
      method: "POST",
      url: "users/forgotPassword",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await axiosInstance({
      method: "POST",
      url: "users/resetPassword",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
