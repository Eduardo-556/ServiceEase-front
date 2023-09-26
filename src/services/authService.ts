import api from "./api";
import Cookies from "js-cookie";

interface RegisterParams {
  firstName: string;
  lastName: string;
  phone: string;
  birth: string;
  email: string;
  language: "pt-BR" | "en-US";
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

const authService = {
  register: async (params: RegisterParams) => {
    const res = await api.post("/auth/register", params).catch((error) => {
      if (error.esponse && error.response.status === 400) {
        return error.response;
      }
      return error;
    });
    return res;
  },

  login: async (params: LoginParams) => {
    const res = await api.post("auth/login", params).catch((error) => {
      if (error.response && error.response.status === 400) {
        return error.response;
      }
      return error;
    });
    if (res.status === 200) {
      Cookies.set("serviceEase-token", res.data.token, { expires: 7 });
    }
    return res;
  },
};

export default authService;
