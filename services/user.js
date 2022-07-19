import { getCookie } from "cookies-next";
import { API } from "./api";

export const getUser = async () => {
  const token = getCookie("te_co");
  console.log(token);
  if (token) {
    const response = await API.get("/user/info", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.status === 200) {
      const result = await response.data;
      return result.data;
    }
  }

  throw new Error("Une erreur est survenue");
};
