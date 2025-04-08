import LightIndicator from "./LightIndicator";
import LinkButton from "./LinkButton";

const Availability = ({
  availability,
  surfaceId,
  surfaceTypeId,
}: {
  availability: boolean | null;
  surfaceTypeId: string;
  surfaceId: string;
}) => {
  if (availability) {
    return (
      <div className="mt-2 flex gap-2 items-center justify-between">
        <LightIndicator color="green" />
        <span>Disponible Online</span>
        <LinkButton
          color="naranja"
          link={`/cotizador?surfaceType=${surfaceTypeId}&surfaceId=${surfaceId}`}
          className=""
          size="pequeño"
          text="Cotizar"
        >
          Cotizar
        </LinkButton>
      </div>
    );
  } else {
    return <p>{"Exótico - disponible bajo pedido"}</p>;
  }
};

export default Availability;
