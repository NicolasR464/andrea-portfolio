"use client";
import { useDebouncedState } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DatePickerInput } from "@mantine/dates";

export default function Filters() {
  const [value, setValue] = useDebouncedState<string | null>(null, 800);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hasParams, setHasParams] = useState(false);
  const [dateRangeValue, setDateRangeValue] = useState<
    [Date | null, Date | null]
  >([null, null]);
  const [dateValue, setDateValue] = useState<Date | null>(null);

  useEffect(() => {
    console.log(hasParams);

    if (searchParams.has("input")) {
      setValue(searchParams.get("input"));
      setHasParams(true);
    } else {
      setValue("");
      setHasParams(false);
    }
  }, [searchParams, hasParams, setValue]);

  useEffect(() => {
    if (value) {
      router.push(`/a/orders?input=${value}`);
    }
  }, [router, value]);

  return (
    <section className="flex w-screen justify-center flex-col items-center">
      <div>
        <input
          name="filter-input"
          className="input  min-w-[280px] m-1 tablet:m-2 text-center"
          type="text"
          placeholder="name or email 🔍"
          defaultValue={value ? value : ""}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </div>
      <div className="mb-2 flex justify-center content-center">
        <DatePickerInput
          className="text-center"
          placeholder=" Pick date  "
          value={dateValue}
          onChange={setDateValue}
          mx="auto"
          maw={400}
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
        />
      </div>

      {hasParams && (
        <button
          className="btn tablet:btn-ghost mb-1"
          onClick={() => router.push("/a/orders")}
        >
          reset filter
        </button>
      )}
    </section>
  );
}
