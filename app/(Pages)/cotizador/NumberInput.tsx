"use client";
import { useState } from "react";

const NumberInput = ({onChange}: {
  onChange: (value: number) => void;
}) => {
  const [value, setValue] = useState<number>(1);
  const handleIncrement = () => {
    onChange(value + 1);
    setValue(value + 1);
  };
  const handleDecrement = () => {
    onChange(value - 1);
    setValue(value - 1);
  }

  return (
    <div className="relative flex items-center">
      <button
        onClick={handleDecrement}
        disabled={value <= 0}
        type="button"
        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg px-3 py-2 h-9 focus:ring-gray-100 focus:ring-2 focus:outline-none"
      >
        <svg
          className="w-3 h-3 text-gray-900 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h16"
          />
        </svg>
      </button>
      <input
        type="text"
        id="quantity-input"
        data-input-counter
        aria-describedby="helper-text-explanation"
        className="bg-gray-50 border-x-0 border-gray-300 h-9 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[4ch] py-2.5"
        placeholder="999"
        required
        value={value}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d*$/.test(value)) {
            onChange(Number(value));
            setValue(Number(value));
          }
        }
        }
      />
      <button
        type="button"
        onClick={handleIncrement}
        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg px-3 py-2 h-9 focus:ring-gray-100 focus:ring-2 focus:outline-none"
      >
        <svg
          className="w-3 h-3 text-gray-900 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default NumberInput;
