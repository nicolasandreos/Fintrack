import { PlusIcon } from "lucide-react";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFormAddTransaction } from "@/form/hooks/transaction";

import FormInput from "./FormInput";
import { Button } from "./ui/button";
import DatePicker from "./ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const ButtonAddTransaction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { formSettings, handleSubmitForm, isPending } = useFormAddTransaction({
    onSuccess: () => setIsModalOpen((currentValue) => !currentValue),
  });

  return (
    <>
      <Button onClick={() => setIsModalOpen((currentValue) => !currentValue)}>
        New Transaction <PlusIcon />
      </Button>
      <Dialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        className="bg-red-500"
      >
        <DialogContent>
          <Form {...formSettings}>
            <form
              onSubmit={formSettings.handleSubmit(handleSubmitForm)}
              className="flex flex-col gap-6"
            >
              <DialogHeader>
                <DialogTitle className="text-center text-2xl">
                  Add Transaction
                </DialogTitle>
                <DialogDescription className="text-md text-center">
                  Fill all the fields below
                </DialogDescription>
              </DialogHeader>

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
                          field.onChange(values.floatValue)
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

              <div className="grid grid-cols-2 gap-2">
                <DialogClose>
                  <Button type="button" className="w-full py-5">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="py-5" disabled={isPending}>
                  {isPending ? <p>Adding</p> : <p>Add</p>}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ButtonAddTransaction;
