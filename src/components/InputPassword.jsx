import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

import { Input } from "./ui/input";

const InputPassword = forwardRef(
  ({ placeholder = "Type your password", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <Input
          ref={ref}
          className="px-4 py-6"
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...props}
        />
        {showPassword ? (
          <EyeOff
            className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        ) : (
          <Eye
            className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        )}
      </div>
    );
  }
);

InputPassword.displayName = "InputPassword";

export default InputPassword;
