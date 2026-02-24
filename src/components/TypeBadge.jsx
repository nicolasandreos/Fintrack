import { tv } from "tailwind-variants";

const bagdeType = tv({
  base: "p-1 font-bold rounded-full flex items-center justify-center gap-2 max-w-25",
  variants: {
    type: {
      EARNING: "bg-green-800/10 text-green-500",
      EXPENSE: "bg-red-500/10 text-red-500",
      INVESTMENT: "bg-blue-500/10 text-blue-700",
    },
  },
});

const circleType = tv({
  base: "w-3 h-3 rounded-full",
  variants: {
    type: {
      EARNING: "bg-green-500",
      EXPENSE: "bg-red-500",
      INVESTMENT: "bg-blue-500",
    },
  },
});

const getTextBadge = ({ variant }) => {
  switch (variant) {
    case "EARNING":
      return "Earning";
    case "EXPENSE":
      return "Expense";
    case "INVESTMENT":
      return "Investment";
  }
};

const TypeBadge = ({ variant }) => {
  return (
    <div className={bagdeType({ type: variant })}>
      <div className={circleType({ type: variant })}></div>
      {getTextBadge({ variant })}
    </div>
  );
};

export default TypeBadge;
