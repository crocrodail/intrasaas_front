import { getUser } from "../../services/user";
import { useQuery } from "react-query";

const useUser = () => {
  return useQuery("user", getUser, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useUser;
