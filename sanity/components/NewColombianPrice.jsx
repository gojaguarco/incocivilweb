import { Stack, TextInput } from "@sanity/ui";
import { useEffect, useState } from "react";
import { set, unset } from "sanity";

const formatNumber = (number) => {
  let numStr = number.toString();
  let result = "";
  let count = 0;

  for (let i = numStr.length - 1; i >= 0; i--) {
    count++;
    result = numStr[i] + result;
    if (count === 3 && i !== 0) {
      result = "." + result;
      count = 0;
    }
  }
  return result;
};

const NewColombianPrice = ({ elementProps, onChange, value }) => {
  const [formatted, setFormatted] = useState("");

  const handleChange = (event) => {
    const rawValue = event.target.value
      .replace(/\$|\s|\./g, "") // remove "$", spaces, and dots
      .replace(/'/g, "");        // in case of apostrophes

    const numericValue = parseInt(rawValue, 10);

    if (isNaN(numericValue)) {
      onChange(unset());
      setFormatted("");
      return;
    }

    const formattedDisplay = formatNumber(numericValue);
    setFormatted(formattedDisplay);
    onChange(set(numericValue)); // ✅ send number to Sanity
  };

  useEffect(() => {
    if (typeof value === "number") {
      setFormatted(formatNumber(value));
    } else {
      setFormatted("");
    }
  }, [value]);

  return (
    <Stack space={2}>
      <TextInput
        {...elementProps}
        onChange={handleChange}
        value={formatted ? `$ ${formatted}` : ""}
      />
    </Stack>
  );
};

export default NewColombianPrice;
