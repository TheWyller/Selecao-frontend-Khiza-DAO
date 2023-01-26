/* eslint-disable prettier/prettier */
import api from "../services/api";

export const apiCall = async (coin, type, from, to) => {
  if (!!from && !to) {
    return await api
      .get(`${coin}/${type}/${from}`)
      .then((res) => res.data)
      .catch((err) => alert(err));
  } else if (!!to && !!from) {
    return await api
      .get(`${coin}/${type}/${from}/${to}`)
      .then((res) => res.data)
      .catch((err) => alert(err));
  } else {
    return await api
      .get(`${coin}/${type}`)
      .then((res) => res.data)
      .catch((err) => alert(err));
  }
};
