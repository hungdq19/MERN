// @ Create Kho Chua Toan bo nhung state lien quan toi client
import { React, createContext, useReducer, useEffect } from "react";
import { apiUrl } from "../Constants/constant";
import axios from "axios";
import { authReducer } from "../Reducer/authReducer";
import { setAuthentication } from "../Config/setAuthen";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  // State va dispash su dung useReducer
  const [authState, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isAuthenticated: false,
    user: null,
  });
  //@ Check xac thuc nguoi dung, va kiem tra User nao su dung token do
  const checkUser = async () => {
    if (localStorage["fullstack"]) {
      setAuthentication(localStorage["fullstack"]);
    }
    try {
      const response = await axios.get(`${apiUrl}`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem("fullstack");
      setAuthentication(null);
      console.log(error);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };
  //@ Khi start web kiem tra luon xem da co USer nao login hay chua
  useEffect(() => checkUser(), []);

  //@ Login Users
  const loginUser = async (formData) => {
    try {
      const res = await axios.post(`${apiUrl}/login`, formData);

      if (res.data.success)
        localStorage.setItem("fullstack", res.data.acessToken);
      await checkUser();

      return res.data;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  };
  // Context Data

  const authData = { loginUser, authState };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};
