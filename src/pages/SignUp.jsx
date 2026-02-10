import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const SingUpSchema = z
  .object({
    firstName: z.string().trim().min(1, "First Name is required"),
    lastName: z.string().trim().min(1, "Last Name is required"),
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

  const handleFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Form {...formSettings}>
        <form onSubmit={formSettings.handleSubmit(handleFormSubmit)}>
          <Card className="w-125">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Create Account</CardTitle>
              <CardDescription>
                Fill in your details to create an account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* FIRST NAME */}
              <FormField
                control={formSettings.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <FormInput placeholder="Type your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* LAST NAME */}
              <FormField
                control={formSettings.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <FormInput placeholder="Type your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* EMAIL */}
              <FormField
                control={formSettings.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <FormInput placeholder="Type your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* PASSWORD */}
              <FormField
                control={formSettings.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputPassword
                        placeholder="Type your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* CONFIRM PASSWORD */}
              <FormField
                control={formSettings.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <InputPassword
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* CHECKBOX TERMS */}
              <FormField
                control={formSettings.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <label
                      className={`block text-sm leading-none font-medium ${formSettings.formState.errors.terms ? "text-red-500" : "text-muted-foreground"}`}
                    >
                      By clicking the checkbox, you agree to our{" "}
                      <a
                        href="#"
                        className={`underline underline-offset-4 opacity-90 hover:opacity-100 ${formSettings.formState.errors.terms ? "text-red-500" : "text-white"}`}
                      >
                        terms and conditions
                      </a>
                      .
                    </label>
                  </FormItem>
                )}
              />
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
      </Form>
    </div>
  );
};

export default SignUpPage;
