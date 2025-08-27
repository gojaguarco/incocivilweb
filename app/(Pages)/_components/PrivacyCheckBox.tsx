import Link from "next/link";

const PrivacyCheckBox = ({
  checked,
  setChecked,
}: {
  checked: boolean;
  setChecked: (newValue: boolean) => void;
}) => {
  return (
    <label className="flex gap-2 items-center my-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <p>
        <span>
          Autorizo el tratamiento de mis datos personales conforme a la{" "}
        </span>
        <Link href={"/politica"} className="text-blue-600">
          <span>Política de Tratamiento de Datos Personales</span>
        </Link>
        <span> de Incocivil.</span>
      </p>
    </label>
  );
};

export default PrivacyCheckBox;
