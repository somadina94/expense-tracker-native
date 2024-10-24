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
      url: "users/updateMe",
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

export const updatePassword = async (data, jwt) => {
  try {
    const response = await axiosInstance({
      method: "PATCH",
      url: `users/updatePassword`,
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

export const getAllExpenses = async (jwt) => {
  try {
    const response = await axiosInstance({
      method: "GET",
      url: "expenses/getAllExpenses",
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createExpense = async (data, jwt) => {
  try {
    const response = await axiosInstance({
      method: "POST",
      url: "expenses/createExpense",
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

export const getOneExpense = async (id, jwt) => {
  try {
    const response = await axiosInstance({
      method: "GET",
      url: `expenses/getOneExpense/${id}`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteExpense = async (id, jwt) => {
  try {
    const response = await axiosInstance({
      method: "DELETE",
      url: `expenses/deleteExpense/${id}`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateExpense = async (data, id, jwt) => {
  try {
    const response = await axiosInstance({
      method: "PATCH",
      url: `expenses/updateExpense/${id}`,
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
