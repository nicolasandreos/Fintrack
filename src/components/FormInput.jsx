import { Input } from "./ui/input";

const FormInput = ({ placeholder, type = "text", ...props }) => {
  return (
    <Input
      className="px-4 py-6"
      type={type}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default FormInput;
