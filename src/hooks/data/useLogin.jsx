import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import api from "@/lib/axios";

const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (credentials) => {
      const response = await api.post("users/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Login successful! User: " + data.first_name);
      localStorage.setItem("accessToken", data.tokens.accessToken);
      localStorage.setItem("refreshToken", data.tokens.refreshToken);
    },
    onError: (error) => {
      toast.error(
        "Login failed: " + error.response?.data?.message ||
          "An error occurred during login."
      );
    },
  });
};

export default useLogin;
