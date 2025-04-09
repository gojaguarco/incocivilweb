const availableColors = {
  white: "bg-gray-200",
  black: "bg-gray-900",
  red: "bg-red-500",
  blue: "bg-blue-600",
  green: "bg-green-500",
  yellow: "bg-yellow-300",
  purple: "bg-purple-500",
} as const;

type AvailableColor = keyof typeof availableColors;

const LightIndicator = ({ color = "white" }: { color: AvailableColor }) => {
  return (
    <span className={`${availableColors[color]} flex w-3 h-3 me-3 rounded-full`}></span>
  );
};

export default LightIndicator;
