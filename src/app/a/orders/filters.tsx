"use client";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DatePickerInput } from "@mantine/dates";
import moment from "moment";
import Link from "next/link";

export default function Filters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [hasParams, setHasParams] = useState(false);

  const [value, setValue] = useState<any>(null);
  const [debouncedInput] = useDebouncedValue(value, 800);

  const [dateRangeValue, setDateRangeValue] = useState<any>([null, null]);
  const [debouncedDateRange] = useDebouncedValue(dateRangeValue, 800);

  const [dateValue, setDateValue] = useState<any>(null);
  const [debouncedDate] = useDebouncedValue(dateValue, 800);

  const [isOnMain, setOnMain] = useState(true);

  // useEffect(() => {
  //   console.log("date 💥");
  // }, [debouncedDate]);

  // useEffect(() => {
  //   console.log({ dateRangeValue });
  // }, [dateRangeValue]);

  useEffect(() => {
    console.log({ dateValue });
    if (searchParams.has("input") && searchParams.get("input") != "null") {
      setOnMain(false);
      setValue(searchParams.get("input"));
      console.log("NOT on main");
    } else {
      console.log("ON main");
      setValue("");
      setDateValue(null);
      setDateRangeValue([null, null]);
    }

    if (searchParams.has("date") && searchParams.get("date") != "null") {
      console.log("HAVE DATE");
      console.log(searchParams.get("date"));

      if (searchParams.get("date")?.includes("-")) {
        const dateStart = new Date(searchParams.get("date")?.split("-")[0]!);
        const dateEnd = new Date(searchParams.get("date")?.split("-")[1]!);

        setDateRangeValue([dateStart, dateEnd]);
      } else {
        const date = new Date(searchParams.get("date")!);
        setDateValue(date);
      }
    } else {
      console.log("DONT HAVE DATE");
      // setDateValue(null);
    }
    setHasParams(searchParams.has("input"));

    // setDateValue(searchParams.get("date"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    if (dateValue) setDateRangeValue([null, null]);
  }, [dateValue]);

  useEffect(() => {
    if (dateRangeValue[0] !== null && dateRangeValue[1] !== null) {
      // console.log("😬");

      setDateValue(null);
    }
  }, [dateRangeValue]);

  useEffect(() => {
    let formattedDate = null;
    let formattedDateRangeStart = null;
    let formattedDateRangeEnd = null;

    console.log({ debouncedDateRange });
    console.log({ debouncedDate });
    console.log({ debouncedInput });

    if (debouncedDate) {
      const date = moment(debouncedDate);
      formattedDate = date.format("ddd DD MMM YYYY");
    } else if (
      debouncedDateRange[0] !== null &&
      debouncedDateRange[1] !== null
    ) {
      const dateStart = moment(dateRangeValue[0]);
      const dateEnd = moment(dateRangeValue[1]);
      formattedDateRangeStart = dateStart.format("ddd DD MMM YYYY");
      formattedDateRangeEnd = dateEnd.format("ddd DD MMM YYYY");
    }

    // (dateRangeValue[0] !== null && dateRangeValue[1] !== null)

    // (formattedDateRangeStart &&
    //   formattedDateRangeStart + "-" + formattedDateRangeEnd)

    if ((debouncedInput !== "" && debouncedInput !== null) || debouncedDate) {
      router.push(`/a/orders?input=${debouncedInput}&date=${formattedDate}`);
    } else if (
      debouncedInput !== "" &&
      debouncedInput !== null &&
      dateRangeValue[0] !== null &&
      dateRangeValue[1] !== null
    ) {
      router.push(
        `/a/orders?input=${debouncedInput}&date=${
          formattedDateRangeStart + "-" + formattedDateRangeEnd
        }`
      );
    }
  }, [
    debouncedInput,
    debouncedDate,
    router,
    debouncedDateRange,
    dateRangeValue,
  ]);

  const handleReset = () => {
    setDateRangeValue([null, null]);
    setDateValue(null);
    setValue("");
    router.push("/a/orders");
    // setTimeout(() => {}, 880);
    // setTimeout(() => setValue(""), 0);
    setValue("");
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
      <Link href="/a/orders">RESET </Link>
    </section>
  );
}
