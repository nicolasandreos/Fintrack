import {
  ExternalLink,
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFormEditTransaction } from "@/form/hooks/transaction";

import FormInput from "./FormInput";
import DatePicker from "./ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const EditTransaction = ({ transaction }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const onSubmitForm = () => {
    setIsSheetOpen((currentValue) => !currentValue);
    return;
  };
  const { formSettings, handleSubmitForm, isPending } = useFormEditTransaction({
    onSuccess: onSubmitForm,
    transaction,
  });

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger>
        <Button variant="ghost">
          <ExternalLink className="w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="border-b pb-5 text-2xl">
            Transaction
          </SheetTitle>
        </SheetHeader>
        <div className="px-4">
          <Form {...formSettings}>
            <form
              onSubmit={formSettings.handleSubmit(handleSubmitForm)}
              className="flex flex-col gap-6"
            >
              {/* TITLE */}
              <FormField
                control={formSettings.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Name</FormLabel>
                    <FormControl>
                      <FormInput placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* amount */}
              <FormField
                control={formSettings.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Amount</FormLabel>
                    <FormControl>
                      <NumericFormat
                        placeholder="Type the value's transaction"
                        prefix="R$ "
                        thousandSeparator="."
                        decimalSeparator=","
                        allowNegative={false}
                        customInput={FormInput}
                        value={field.value}
                        onValueChange={(values) =>
                          field.onChange(values.floatValue ?? "")
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* DATE */}
              <FormField
                control={formSettings.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Date</FormLabel>
                    <FormControl>
                      <DatePicker {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* BOTOES */}
              <FormField
                control={formSettings.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Type</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-3 gap-5">
                        <Button
                          type="button"
                          variant={
                            field.value === "EARNING" ? "secondary" : "outline"
                          }
                          onClick={() => field.onChange("EARNING")}
                          className="text-muted-foreground flex items-center justify-center gap-2 rounded-xl py-5 font-normal"
                        >
                          <TrendingUpIcon className="text-primary" />
                          Earning
                        </Button>
                        <Button
                          type="button"
                          className="text-muted-foreground flex items-center justify-center gap-2 rounded-xl py-5 font-normal"
                          variant={
                            field.value === "EXPENSE" ? "secondary" : "outline"
                          }
                          onClick={() => field.onChange("EXPENSE")}
                        >
                          <TrendingDownIcon className="text-red-500" />
                          Expense
                        </Button>
                        <Button
                          type="button"
                          className="text-muted-foreground flex items-center justify-center gap-2 rounded-xl py-5 font-normal"
                          variant={
                            field.value === "INVESTMENT"
                              ? "secondary"
                              : "outline"
                          }
                          onClick={() => field.onChange("INVESTMENT")}
                        >
                          <PiggyBankIcon className="text-blue-500" />
                          Investment
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SheetFooter>
                <div className="flex w-full justify-between space-x-1">
                  <SheetClose asChild>
                    <Button className="w-42" variant="outline">
                      Close
                    </Button>
                  </SheetClose>
                  <Button className="w-42" type="submit" disabled={isPending}>
                    {isPending ? "Saving" : "Save"}
                  </Button>
                </div>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditTransaction;
