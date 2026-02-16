import { addDays, addMonths, format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import DatePickerWithRange from "./date-picker-with-range";

const DateSelector = () => {
  const [searchParams] = useSearchParams();
  const [date, setDate] = useState({
    from: searchParams.get("from")
      ? new Date(searchParams.get("from") + "T00:00:00")
      : new Date(),
    to: searchParams.get("to")
      ? new Date(searchParams.get("to") + "T00:00:00")
      : addMonths(new Date(), 1),
  });
  const navigate = useNavigate();

  const formatDate = (date) => format(date, "yyyy-MM-dd");

  useEffect(() => {
    if (!date?.from || !date?.to) return;
    const searchParams = new URLSearchParams();
    searchParams.set("from", formatDate(date.from));
    searchParams.set("to", formatDate(date.to));
    navigate(`/?${searchParams.toString()}`);
  }, [date]);

  return <DatePickerWithRange value={date} onChange={setDate} />;
};

export default DateSelector;
