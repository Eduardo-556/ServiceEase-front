import api from "./api";

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
      if (error.response.status === 400) {
        return error.response;
      }
      return error;
    });
    return res;
  },

  login: async (params: LoginParams) => {
    const res = await api.post("auth/login", params).catch((erro) => {
      if (erro.response.status === 400) {
        return erro.response;
      }
      return erro;
    });

    if (res.status === 200) {
      sessionStorage.setItem("serviceEase-token", res.data.token);
    }
    return res;
  },
};

export default authService;
