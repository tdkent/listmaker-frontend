import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { fetchUserProfile } from "../api/user";

const useUser = (userId: number, token: string) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserProfile(token),
  });
  return { isError, isLoading, data, error: error as AxiosError };
};

export default useUser;
