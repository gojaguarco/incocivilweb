"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ComponentPropsWithoutRef, Suspense, useCallback } from "react";
import { cn } from "../_lib/cn";
type Props = ComponentPropsWithoutRef<'select'> & {
  filterName: string;
  options: {
    value: string;
    label: string;
  }[];
  allTitle: string;
  allValue?: string;
};

const Select = ({ filterName, options, allTitle, allValue, className, ...rest }: Props) => {

  const searchParams = useSearchParams();

  const selectedOption = searchParams.get(filterName);

  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string, action: 'add' | 'remove' | 'replace' = 'add') => {
      const params = new URLSearchParams(searchParams.toString())
      const currentValues = params.get(name)?.split(',').filter(Boolean) || []

      if (action === 'add' && !currentValues.includes(value)) {
        params.set(name, [...currentValues, value].join(','))
      } else if (action === 'remove') {
        params.set(name, currentValues.filter(v => v !== value).join(','))
      } else if (action === "replace") {
        params.set(name, value)
      };

      return params.toString()
    },
    [searchParams]);


  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    router.push(`?${createQueryString(filterName, value, "replace")}`, { scroll: false });
  };

  const optionsWiithAll = [{ value: allValue ?? "all", label: allTitle }, ...options];

  const filteredOptions = optionsWiithAll.filter(option => option.value !== selectedOption);

  const selectedOptionLabel = options.find(option => option.value === selectedOption)?.label;
  return (
    <select onChange={onSelectChange}
      className={cn(`bg-light text-dark px-4 py-2 rounded-lg flex items-center gap-2 text-sm md:text-base lg:text-lg`, className)}
      {...rest}
    >
      <option value={selectedOption ?? allValue ?? "all"}>
        {selectedOptionLabel ?? allTitle}
      </option>
      {filteredOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

const SelectFilter = ({ filterName, options, allTitle, allValue, ...rest }: Props) => {
  return (
    <Suspense>
      <Select
        filterName={filterName}
        options={options}
        allTitle={allTitle}
        allValue={allValue}
        {...rest}
      />
    </Suspense>
  );
}

export default SelectFilter;