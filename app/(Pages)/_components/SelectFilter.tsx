"use client";
import { useRouter } from "next/navigation";

const SelectFilter = ({ filterName, options, allTitle, allValue }: {
  filterName: string;
  options: {
    value: string;
    label: string;
  }[];
  allTitle: string;
  allValue?: string;
}) => {

  const router = useRouter();
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    router.push(`?${filterName}=${value}`, {
      scroll: false
    });
  };
  return (
    <select onChange={onSelectChange} className="bg-light text-dark px-4 py-2 rounded-lg flex items-center gap-2 text-lg">
      <option value={allValue ?? "all"}>
        {allTitle}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SelectFilter;