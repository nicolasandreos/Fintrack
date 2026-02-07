import { Link } from "react-router";

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
import { Input } from "@/components/ui/input";

const SignUpPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="w-125">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Create Account</CardTitle>
          <CardDescription>
            Fill in your details to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <FormInput placeholder="Type your name" />
            <FormInput placeholder="Type your email" type="email" />
            <InputPassword />
            <InputPassword placeholder="Confirm your password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button className="w-full py-6 text-xl">Sign Up</Button>
          <div className="mt-4 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?
            </p>
            <Button variant="link" className="ml-1 p-0 text-sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
