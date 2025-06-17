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
      <div className="flex gap-2 items-center justify-between">
        <div className="flex items-center">
          <LightIndicator color="green" />
          <span className="text-xs">Disponible Online</span>
        </div>
        <LinkButton
          color="naranja"
          link={`/cotizador?surfaceType=${surfaceTypeId}&surfaceId=${surfaceId}`}
          className="py-0.5 px-1"
          size="pequeño"
          text="Cotizar"
        >
          Cotizar
        </LinkButton>
      </div>
    );
  } else {
    return <p className="text-xs ">{"* Exótico - disponible bajo pedido"}</p>;
  }
};

export default Availability;
