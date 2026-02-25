import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
} from "@/constants/localStorage";
import api from "@/lib/axios";

const useCreateUser = () =>
  useMutation({
    mutationKey: ["createUser"],
    mutationFn: async (formData) => {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
      };
      const response = await api.post("/users", payload);
      const createdUser = response.data;
      console.log("Created User:", createdUser);
      return createdUser;
    },
    onSuccess: (createdUser) => {
      toast.success("User created successfully!");
      localStorage.setItem(
        LOCAL_STORAGE_ACCESS_TOKEN,
        createdUser.tokens.accessToken
      );
      localStorage.setItem(
        LOCAL_STORAGE_REFRESH_TOKEN,
        createdUser.tokens.refreshToken
      );
    },
    onError: (error) => {
      const apiMessage =
        error.response?.data?.message ||
        "Failed to create user. Please try again.";

      toast.error(apiMessage);
    },
  });

export default useCreateUser;
