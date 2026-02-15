import { LogOutIcon } from "lucide-react";

import Logo from "@/assets/images/logo.svg";
import { useAuthContext } from "@/contexts/auth";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const { user, logout } = useAuthContext();
  const normalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const getInicialLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="flex w-screen justify-between border-b px-8 py-4">
      <div className="flex items-center gap-12">
        <img src={Logo} alt="Logo FinTrack" />
        <p className="text-primary font-semibold">Dashboard</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" className="space-x-1">
            <Avatar className="h-6 w-6">
              <AvatarImage src="myProfile" />
              <AvatarFallback>
                {getInicialLetter(user.first_name)}
                {getInicialLetter(user.last_name)}
              </AvatarFallback>
            </Avatar>
            <p>
              {normalizeName(user.first_name)} {normalizeName(user.last_name)}
            </p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              variant="ghost"
              size="small"
              className="w-full justify-start"
              onClick={logout}
            >
              <LogOutIcon /> Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
