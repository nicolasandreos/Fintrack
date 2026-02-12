import { LoaderCircle } from "lucide-react";

const LoadingAuthentication = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center transition-opacity duration-300">
      <div className="flex flex-col items-center gap-4">
        <LoaderCircle className="text-primary h-10 w-10 animate-spin" />
        <p className="text-muted-foreground animate-pulse text-sm">
          Authenticating your session...
        </p>
      </div>
    </div>
  );
};

export default LoadingAuthentication;
