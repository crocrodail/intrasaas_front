import { setCookies } from "cookies-next";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { login } from "../../services/auth";

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation((data) => login(data), {
    onSuccess: (data) => {
      setCookies("te_co", data.data.token);
      queryClient.setQueryData("user", data.data.user);
      router.push("/");
    },
    onError: (error) => console.error("oups erreurs"),
  });
};

export default useLoginMutation;
