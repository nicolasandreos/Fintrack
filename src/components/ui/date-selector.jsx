import { useQueryClient } from "@tanstack/react-query";
import { addMonths, format, isValid } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { useAuthContext } from "@/contexts/auth";

import DatePickerWithRange from "./date-picker-with-range";

const DateSelector = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const getDateState = (searchParams = null) => {
    const defaultDate = {
      from: new Date(),
      to: addMonths(new Date(), 1),
    };
    if (!searchParams) return defaultDate;

    // pega valores na url
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    // boleana verifica se algum é vazio
    const nullValueDates = !from || !to;

    // verifica se é uma data válida
    const isInvalidDate = !isValid(new Date(from)) || !isValid(new Date(to));
    if (nullValueDates || isInvalidDate) return defaultDate;

    // Tudo certo, retorna nova data da url
    return { from, to };
  };

  const [date, setDate] = useState(getDateState());
  const navigate = useNavigate();

  const formatDate = (date) => format(date, "yyyy-MM-dd");

  useEffect(() => {
    const searchParams = new URLSearchParams();
    const { from, to } = getDateState(searchParams);
    queryClient.invalidateQueries({
      queryKey: ["user-transactions", user?.id, from, to],
    });
    searchParams.set("from", formatDate(date.from));
    searchParams.set("to", formatDate(date.to));
    navigate(`/?${searchParams.toString()}`);
  }, [date, searchParams, navigate]);

  return <DatePickerWithRange value={date} onChange={setDate} />;
};

export default DateSelector;
