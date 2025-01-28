"use client";
import { useRouter, useSearchParams } from "next/navigation";

const SelectFilter = ({ filterName, options, allTitle, allValue }: {
  filterName: string;
  options: {
    value: string;
    label: string;
  }[];
  allTitle: string;
  allValue?: string;
}) => {

  const searchParams = useSearchParams();

  const selectedOption = searchParams.get(filterName);

  const router = useRouter();
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    router.push(`?${filterName}=${value}`, {
      scroll: false
    });
  };

  const optionsWiithAll = [{ value: allValue ?? "all", label: allTitle }, ...options];

  const filteredOptions = optionsWiithAll.filter(option => option.value !== selectedOption);

  const selectedOptionLabel = options.find(option => option.value === selectedOption)?.label;
  return (
    <select onChange={onSelectChange} className="bg-light text-dark px-4 py-2 rounded-lg flex items-center gap-2 text-lg">
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

export default SelectFilter;