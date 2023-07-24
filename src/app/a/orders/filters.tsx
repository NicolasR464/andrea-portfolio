"use client";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DatePickerInput } from "@mantine/dates";
import moment from "moment";

export default function Filters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [hasParams, setHasParams] = useState(false);

  const [value, setValue] = useState<any>(null);
  const [debouncedInput] = useDebouncedValue(value, 800);

  const [dateRangeValue, setDateRangeValue] = useState<
    [Date | null, Date | null]
  >([null, null]);
  const [debouncedDateRange] = useDebouncedValue(dateRangeValue, 800);

  const [dateValue, setDateValue] = useState<any>(null);
  const [debouncedDate] = useDebouncedValue(dateValue, 800);

  useEffect(() => {
    console.log("date 💥");
  }, [debouncedDate]);

  useEffect(() => {
    console.log({ dateValue });
    if (searchParams.has("input") && searchParams.get("input") != "null") {
      setValue(searchParams.get("input"));
      console.log("NOT on main");
    }

    if (searchParams.has("date") && searchParams.get("date") != "null") {
      console.log("HAVE DATE");
      console.log(searchParams.get("date"));

      const date = new Date(searchParams.get("date")!);
      setDateValue(date);
    } else {
      console.log("DONT HAVE DATE");
      setDateValue(null);
    }
    setHasParams(searchParams.has("input"));

    // setDateValue(searchParams.get("date"));
  }, [searchParams]);

  //   useEffect(() => {
  //     if (
  //       searchParams.has("date") &&
  //       searchParams.get("date") !== "null" &&
  //       !dateValue
  //     ) {
  //       console.log(typeof searchParams.get("date"));
  //       console.log(searchParams.get("date"));

  //       const dateParsed = new Date(searchParams.get("date")!);
  //       console.log(typeof dateParsed);
  //       console.log(dateParsed);

  //       setDateValue(dateParsed);
  //     }
  //   }, [searchParams, dateValue]);

  //   useEffect(() => {
  //     console.log(searchParams.has("input"));
  //     if (searchParams.has("input")) {
  //       setHasParams(true);
  //       //   setValue(searchParams.get("input"));
  //     }
  //   }, [searchParams, setValue]);

  //   useEffect(() => {
  //     if (dateValue) setDateRangeValue([null, null]);
  //   }, [dateValue]);

  //   useEffect(() => {
  //     if (dateRangeValue[0] !== null && dateRangeValue[1] !== null)
  //       setDateValue(null);
  //   }, [dateRangeValue]);

  useEffect(() => {
    let formattedDate = null;
    if (debouncedDate) {
      const date = moment(debouncedDate);
      formattedDate = date.format("ddd DD MMM YYYY");
    }

    if (debouncedInput || debouncedDate) {
      router.push(`/a/orders?input=${debouncedInput}&date=${formattedDate}`);
    }
  }, [debouncedInput, debouncedDate, router]);

  const handleReset = () => {
    setDateRangeValue([null, null]);
    setDateValue(null);
    setValue("");
    router.push("/a/orders");
    setTimeout(() => setValue(""), 0);
    setDateRangeValue([null, null]);
    setDateValue(null);
  };

  return (
    <section className="flex w-screen justify-center flex-col items-center">
      <div>
        <input
          className="input  min-w-[280px] m-1 tablet:m-2 text-center"
          type="text"
          placeholder="name or email 🔍"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </div>
      <div className="mb-2 flex justify-center content-center">
        <DatePickerInput
          className="text-center"
          clearable
          allowDeselect
          placeholder=" Pick date  "
          value={dateValue}
          onChange={setDateValue}
          mx="auto"
          maw={400}
          valueFormat="DD MMM YYYY"
        />
        <span className="m-1">OR</span>
        <DatePickerInput
          className="text-center"
          clearable
          type="range"
          placeholder="dates range"
          value={dateRangeValue}
          onChange={setDateRangeValue}
          mx="auto"
          maw={400}
          valueFormat="DD MMM YYYY"
        />
      </div>

      {hasParams && (
        <button
          className="btn tablet:btn-ghost mb-1"
          onClick={() => handleReset()}
        >
          reset filter
        </button>
      )}
    </section>
  );
}
