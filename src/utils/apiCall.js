/* eslint-disable prettier/prettier */
import api from "../services/api";

export const apiCall = async (coin, type, from, to) => {
  if (!!from && !to) {
    return await api
      .get(`${coin}/${type}/${from}`)
      .then((res) => res.data)
      .catch((err) => err);
  } else if (!!to && !!from) {
    // if (to < from) {
    //   return new Error();
    // } else {
    return await api
      .get(`${coin}/${type}/${from}/${to}`)
      .then((res) => res.data)
      .catch((err) => err);
    // }
  } else {
    return await api
      .get(`${coin}/${type}`)
      .then((res) => res.data)
      .catch((err) => err);
  }
};
