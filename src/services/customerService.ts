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
        console.log(error.response.data.message);
        return error.response;
      });

    return res;
  },
};

export default customerService;
