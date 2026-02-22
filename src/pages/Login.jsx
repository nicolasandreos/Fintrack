import { Link, Navigate } from "react-router";

import FormInput from "@/components/FormInput";
import InputPassword from "@/components/InputPassword";
import LoadingAuthentication from "@/components/LoadingAuthentication";
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
import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
} from "@/constants/localStorage";
import { useAuthContext } from "@/contexts/auth";
import { useFormUserLogin } from "@/form/hooks/user";

const LoginPage = () => {
  const { login, user, isAuthenticating } = useAuthContext();
  const { formSettings, handleSubmitForm } = useFormUserLogin({
    onSuccess: () => {
      removeTokens();
    },
  });

  const removeTokens = () => {
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
  };

  if (isAuthenticating) {
    return <LoadingAuthentication />;
  }

  if (user) {
    return <Navigate to="/" />;
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
