import { getCookie, removeCookies } from "cookies-next";
import { API } from "./api";

const isLoginAdmin = async (token) => {
  token = token
    ? token
    : getCookie("te_co")
    ? getCookie("te_co").toString()
    : undefined;

  if (token) {
    const response = await API.get("/user/info", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response.status === 200) {
      if (response.data.data.role[0] === "Admin") {
        return false;
      } else {
        removeCookies("te_co");
        return true;
      }
    }
  }
};

export default isLoginAdmin;
