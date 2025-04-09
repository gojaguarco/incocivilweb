import LightIndicator from "./LightIndicator";
import LinkButton from "./LinkButton";

const Availability = ({ availability, surfaceId, surfaceTypeId }: {
  availability: boolean | null;
  surfaceTypeId: string;
  surfaceId: string;
}) => {
  if (availability) {
    return (
      <div className="mt-2 flex items-center">
        <LightIndicator color="green" />
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
    )
  } else {
    return (
      <p>Disponible Online</p>
    )
  }
}

export default Availability;