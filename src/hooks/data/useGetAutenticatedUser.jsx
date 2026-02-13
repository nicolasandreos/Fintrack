import { useQuery } from "@tanstack/react-query";

import { LOCAL_STORAGE_ACCESS_TOKEN } from "@/constants/localStorage";
import api from "@/lib/axios";

const useGetAutenticatedUser = () => {
  return useQuery({
    queryKey: ["authenticatedUser"],
    queryFn: async () => {
      const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
      if (!accessToken) {
        console.error("No access token found");
        return;
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
