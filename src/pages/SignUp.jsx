import { zodResolver } from "@hookform/resolvers/zod";
import { Controller,useForm } from "react-hook-form";
import { Link } from "react-router";
import * as z from "zod";

import FormInput from "@/components/FormInput";
import InputPassword from "@/components/InputPassword";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const SingUpSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .trim()
      .min(6, "Confirm Password must be at least 6 characters"),
    terms: z.boolean().refine((value) => value === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

const SignUpPage = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SingUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const handleFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Card className="w-125">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Create Account</CardTitle>
            <CardDescription>
              Fill in your details to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName">First Name</label>
                <FormInput
                  {...register("name")}
                  placeholder="Type your name"
                  id="firstName"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <FormInput
                  {...register("email")}
                  placeholder="Type your email"
                  type="email"
                  id="email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <InputPassword {...register("password")} id="password" />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <InputPassword
                  {...register("confirmPassword")}
                  placeholder="Confirm your password"
                  id="confirmPassword"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <Controller
                  name="terms"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <Button type="submit" className="w-full py-6 text-xl">
              Sign Up
            </Button>
            <div className="mt-4 flex items-center justify-center">
              <p className="text-muted-foreground text-sm">
                Already have an account?
              </p>
              <Button
                type="button"
                variant="link"
                className="ml-1 p-0 text-sm"
                asChild
              >
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default SignUpPage;
