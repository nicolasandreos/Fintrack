import { forwardRef } from "react";

import { Input } from "./ui/input";

const FormInput = forwardRef(
  ({ placeholder, type = "text", ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className="px-4 py-6"
        type={type}
        placeholder={placeholder}
        {...props}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
