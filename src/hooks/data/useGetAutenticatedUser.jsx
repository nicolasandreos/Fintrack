import { useQuery } from "@tanstack/react-query";

import api from "@/lib/axios";

const useGetAutenticatedUser = () => {
  return useQuery({
    queryKey: ["authenticatedUser"],
    queryFn: async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No access token found");
      }
      const response = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const authenticatedUser = response.data;
      return authenticatedUser;
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};

export default useGetAutenticatedUser;
