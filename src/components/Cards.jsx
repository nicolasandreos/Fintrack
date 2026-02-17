import { WalletIcon } from "lucide-react";

import CardSection from "./Card";

const Cards = () => {
  return (
    <div className="grid w-213 grid-cols-2 grid-rows-2 gap-4">
      <CardSection
        text="Wallet"
        value="R$ 2.700,00"
        icon={<WalletIcon className="h-5 w-5 text-white opacity-100" />}
      />
      <CardSection
        text="Wallet"
        value="R$ 2.700,00"
        icon={<WalletIcon className="h-5 w-5 text-white opacity-100" />}
      />
      <CardSection
        text="Wallet"
        value="R$ 2.700,00"
        icon={<WalletIcon className="h-5 w-5 text-white opacity-100" />}
      />
      <CardSection
        text="Wallet"
        value="R$ 2.700,00"
        icon={<WalletIcon className="h-5 w-5 text-white opacity-100" />}
      />
    </div>
  );
};

export default Cards;
