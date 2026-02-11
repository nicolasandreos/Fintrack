import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import api from "@/lib/axios";

const useCreateUser = () =>
  useMutation({
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
      localStorage.setItem("accessToken", createdUser.tokens.accessToken);
      localStorage.setItem("refreshToken", createdUser.tokens.refreshToken);
    },
    onError: (error) => {
      const apiMessage =
        error.response?.data?.message ||
        "Failed to create user. Please try again.";

      toast.error(apiMessage);
    },
  });

export default useCreateUser;
