import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import z from "zod";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AuthContext } from "@/contexts/auth";
import useGetAutenticatedUser from "@/hooks/data/useGetAutenticatedUser";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const formSettings = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [user, setUser] = useState(null);
  const { data: authenticatedUser } = useGetAutenticatedUser();
  const { login, user: userContext } = useContext(AuthContext);

  useEffect(() => {
    try {
      if (authenticatedUser) {
        setUser(authenticatedUser);
      }
    } catch (error) {
      console.error("Error setting authenticated user:", error);
    }
  }, [authenticatedUser]);

  const removeTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  const handleSubmitForm = (formData) => {
    removeTokens();
    login(formData);
  };

  if (userContext) {
    return <h1>{userContext?.first_name}</h1>;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Form {...formSettings}>
        <form onSubmit={formSettings.handleSubmit(handleSubmitForm)}>
          <Card className="w-125">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Enter your credentials</CardTitle>
              <CardDescription>
                Fill in your username and password to log in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* EMAIL */}
              <FormField
                control={formSettings.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <FormInput
                        type="email"
                        placeholder="Type your email"
                        {...field}
                      />
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
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <Button type="submit" className="w-full py-6 text-xl">
                Login
              </Button>
              <div className="mt-4 flex items-center justify-center">
                <p className="text-muted-foreground text-sm">
                  Don't have an account?
                </p>
                <Button
                  type="button"
                  variant="link"
                  className="ml-1 p-0 text-sm"
                  asChild
                >
                  <Link to="/signup">Register</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
