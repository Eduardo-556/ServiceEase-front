import api from "./api";
import { CustomerType } from "./customerService";
import profileService from "./profileService";

export type OrderType = {
  id: number;
  deviceModel: string;
  deviceSerial: string;
  deviceImei: string;
  serviceDescription: string;
  deadline: Date;
  serviceStatus: string;
  startTime: Date;
  pauseTime: Date;
  endTime: Date;
  totalTime: Date;
  totalCost: string;
  customerId: number;
  createdAt: string;
  updatedAt: string;
  Customer: CustomerType;
};

interface OrderParams {
  deviceModel: string;
  deviceSerial: string;
  deviceImei: string;
  serviceDescription: string;
  deadline: Date;
  serviceStatus: string;
}

interface CreateOrderParams {
  customerId: number;
  deviceModel: string;
  deviceSerial: string;
  deviceImei: string;
  serviceDescription: string;
  deadline: Date;
}

interface TimeParams {
  totalTime: number;
  serviceStatus: string;
}

const ordersService = {
  getSearch: async (name: string) => {
    const token = sessionStorage.getItem("serviceEase-token");
    const { id } = await profileService.fetchCurrent();

    const res = await api
      .get(`/${id}/service/search?name=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  getDetails: async (orderId: string) => {
    const token = sessionStorage.getItem("serviceEase-token");
    const res = await api
      .get(`/service/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res.data;
  },

  postUpdate: async (orderId: string, params: OrderParams) => {
    const token = sessionStorage.getItem("serviceEase-token");
    const res = await api
      .put(`/service/update/${orderId}`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res.status;
  },

  postUpdateTime: async (orderId: string, params: TimeParams) => {
    const token = sessionStorage.getItem("serviceEase-token");
    const res = await api
      .put(`/service/update/${orderId}`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res.status;
  },

  postCreate: async (params: CreateOrderParams) => {
    const token = sessionStorage.getItem("serviceEase-token");

    const res = await api
      .post(`/service/create`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },
};

export default ordersService;
