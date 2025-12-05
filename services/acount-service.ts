import { useAxiosApi } from "@/lib/api/axios-client";

export interface UserData {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  email: string;
  role: string;
}

export const useAcountService = () => {

  const api = useAxiosApi();

  const registerUser = async (userData: UserData): Promise<UserResponse | null> => {
    try {
      const response = await api.post<{ message: string; user: UserResponse }>("/users/register", userData);
      console.log("Registro exitoso:", response.data.user);
      return response.data.user;
    } catch (err: any) {
      console.log("Error en registro:", err.response?.data?.message || err.message);
      return null;
    }
  };

  
  const loginUser = async (userData: UserData): Promise<UserResponse | null> => {
    try {
      const response = await api.post<{ message: string; user: UserResponse }>("/users/login", userData);
      console.log("Login exitoso:", response.data.user);
      return response.data.user;
    } catch (err: any) {
      console.log("Error en login:", err.response?.data?.message || err.message);
      return null;
    }
  };

  return { registerUser, loginUser };
};
