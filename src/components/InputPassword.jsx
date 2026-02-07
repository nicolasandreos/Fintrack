import { Eye } from "lucide-react";
import { useState } from "react";

import { Input } from "./ui/input";

const InputPassword = ({ placeholder = "Type your password" }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        className="px-4 py-6"
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
      />
      <Eye
        className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer"
        onClick={() => setShowPassword((prev) => !prev)}
      />
    </div>
  );
};

export default InputPassword;
