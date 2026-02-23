import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAuthContext } from "@/contexts/auth";

import { loginSchema, SingUpSchema } from "../schemas/user";

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

export const useFormSignUp = () => {
  const { signUp } = useAuthContext();
  const formSettings = useForm({
    resolver: zodResolver(SingUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const handleFormSubmit = (formData) => {
    signUp(formData);
  };

  return { formSettings, handleFormSubmit };
};
