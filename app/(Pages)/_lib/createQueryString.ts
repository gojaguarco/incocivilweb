import { ReadonlyURLSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useCreateQueryString(searchParams: ReadonlyURLSearchParams) {
  return useCallback(
    (
      name: string,
      value: string,
      action: "add" | "remove" | "replace" = "add"
    ) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentValues = params.get(name)?.split(",").filter(Boolean) || [];

      if (action === "add" && !currentValues.includes(value)) {
        params.set(name, [...currentValues, value].join(","));
      } else if (action === "remove") {
        params.set(name, currentValues.filter((v) => v !== value).join(","));
      } else if (action === "replace") {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );
}
