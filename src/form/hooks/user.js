import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAuthContext } from "@/contexts/auth";

import { loginSchema } from "../schemas/user";

export const useFormUserLogin = ({ onSuccess }) => {
  const { login } = useAuthContext();
  const formSettings = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitForm = (formData) => {
    onSuccess();
    login(formData);
  };

  return { formSettings, handleSubmitForm };
};
