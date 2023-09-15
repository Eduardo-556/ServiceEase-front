import api from "./api";
import profileService from "./profileService";

export type CustomerType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  userId: number;
};

type CustomerParams = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
};

const customerService = {
  getSearch: async (name: string) => {
    const token = sessionStorage.getItem("serviceEase-token");
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
    const token = sessionStorage.getItem("serviceEase-token");
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
    const token = sessionStorage.getItem("serviceEase-token");
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
};

export default customerService;
