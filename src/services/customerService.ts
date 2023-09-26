import api from "./api";
import profileService from "./profileService";
import Cookies from "js-cookie";
export type CustomerType = {
  id: number;
  firstName: string;
  lastName: string;
  nif: string;
  email: string;
  phone: string;
  address: string;
  userId: number;
};

type CustomerParams = {
  firstName: string;
  lastName: string;
  nif: string;
  email: string;
  phone: string;
  address: string;
};

export type CreateCustomer = {
  firstName: string;
  lastName: string;
  nif: string;
  email: string;
  phone: string;
  address: string;
  userId: number;
};

type DeleteCustomer = {
  customerId: string;
  userId: string;
};

const customerService = {
  postCreate: async (params: CreateCustomer) => {
    const token = Cookies.get("serviceEase-token");
    const res = await api
      .post("/customer/create", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });
    return res;
  },

  getAll: async () => {
    const token = Cookies.get("serviceEase-token");
    const { id } = await profileService.fetchCurrent();

    const res = await api.get(`/users/${id}/customer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },

  getSearch: async (name: string) => {
    const token = Cookies.get("serviceEase-token");
    const { id } = await profileService.fetchCurrent();

    const res = await api
      .get(`/users/${id}/search?name=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  getDetails: async (customerId: string) => {
    const token = Cookies.get("serviceEase-token");
    const { id } = await profileService.fetchCurrent();

    const res = await api
      .get(`users/${id}/customer/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res.data;
  },

  postUpdate: async (customerId: string, params: CustomerParams) => {
    const token = Cookies.get("serviceEase-token");
    const res = await api
      .put(`/customer/update/${customerId}`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });
    return res.status;
  },

  deleteCustomer: async (params: DeleteCustomer) => {
    const token = Cookies.get("serviceEase-token");
    const res = await api
      .delete("/customer/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: params,
      })
      .catch((error) => {
        return error.response;
      });
    return res.status;
  },
};

export default customerService;
