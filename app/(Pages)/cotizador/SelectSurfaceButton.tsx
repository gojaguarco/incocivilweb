import LinkButton from "../_components/LinkButton";

const SelectSurfaceButton = () => {
  const onClick = () => {
    const surfaceSelectorElem = document.getElementById("surface-selector");

    if (surfaceSelectorElem) {
      surfaceSelectorElem.classList.add(
        "outline",
        "outline-red-400",
        "outline-offset-0",
        "rounded-md"
      );
      surfaceSelectorElem.classList.add("animate-outline-blink-red");

      const blinkDuration = 2000;

      setTimeout(() => {
        surfaceSelectorElem.classList.remove("animate-outline-blink-red");

        surfaceSelectorElem.classList.remove(
          "outline",
          "outline-red-400",
          "outline-offset-0",
          "rounded-md"
        );
      }, blinkDuration);
    }
  };
  return (
    <LinkButton
      color="naranja"
      size="pequeño"
      text="Agrega una superficie!"
      link="#surface-selector"
      onClick={onClick}
    ></LinkButton>
  );
};

export default SelectSurfaceButton;
