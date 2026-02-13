import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
} from "@/constants/localStorage";
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
      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, data.tokens.accessToken);
      localStorage.setItem(
        LOCAL_STORAGE_REFRESH_TOKEN,
        data.tokens.refreshToken
      );
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
