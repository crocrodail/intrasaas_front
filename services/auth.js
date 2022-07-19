import { API } from "./api";

export const login = async (data) => {
  const response = await API.post("/auth/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    const result = await response.data;
    return result;
  }

  throw new Error("Une erreur est survenue");
};
