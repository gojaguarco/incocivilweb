import { SelectedSurfaces } from "@/app/(Pages)/cotizador/captureInfoZods";
import { numberToColombianPriceString } from "@/app/helpers";
import {
  Body,
  Column,
  Container,
  Heading,
  Html,
  Img,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type QuoteEmailTemplateProps = {
  data: {
    name: string;
    email: string;
    tel: string;
    message?: string | null;
    selectedSurfaces: SelectedSurfaces;
  };
};

export const QuoteEmailTemplate: React.FC<
  Readonly<QuoteEmailTemplateProps>
> = ({ data }) => {
  const total = data.selectedSurfaces.reduce(
    (sum, surface) => sum + surface.totalSurface,
    0
  );
  return (
    <Tailwind>
      <Html>
        <Body style={main}>
          <Container style={container}>
            <Img
              className="mx-auto max-w-[400px] object-contain"
              src={
                "https://cdn.sanity.io/images/fwylo0af/production/2dd6553c40fe2e378dbb347974e96801b946636f-467x292.svg?fit=max&q=80&w=400&fm=png"
              }
              alt="Incocivil Isologo"
              width="719"
              height="150"
            ></Img>
            <Img
              className="ml-auto mr-auto object-contain"
              src={
                "https://cdn.sanity.io/images/fwylo0af/production/3511480325e0be5033de106ae93824e88fc0672a-515x69.svg?fit=max&q=80&w=400&fm=png"
              }
              alt="Incocivil logo text"
              width="400"
              height="150"
            ></Img>
            <Heading style={{ ...heading, fontSize: "46px" }}>
              Cotización
            </Heading>
            <Heading style={heading}>Nuevo Mensaje de: {data.name}</Heading>
            <Text>Datos del Mensaje</Text>
            <Text>Envía: {data.name}</Text>
            <Text>Email: {data.email}</Text>
            <Text>Teléfono: {data.tel}</Text>
            <Text>Mensaje: {data.message}</Text>
            {data.selectedSurfaces.map((surface) => (
              <Row
                style={{
                  margin: "10px 0",
                }}
                key={surface.id}
              >
                <Column style={{ width: "64px" }}>
                  <Img
                    src={surface.image}
                    width="64"
                    height="64"
                    alt={surface.name}
                    style={productIcon}
                  />
                </Column>
                <Column style={{ paddingLeft: "22px" }}>
                  <Text style={productTitle}>{surface.name}</Text>
                  <Text style={productTitle}>
                    Codigo Superficie: {surface.code}
                  </Text>
                  <Text style={productDescription}>
                    Formato: {surface.width}x{surface.height}
                  </Text>
                  {/* <Text style={productDescription}>
                    Cantidad: {surface.quanity}
                  </Text> */}
                </Column>
                <Column style={productPriceWrapper} align="right">
                  <Text style={productPrice}>
                    Valor: {numberToColombianPriceString(surface.totalSurface)}
                  </Text>
                </Column>
              </Row>
            ))}
            <Section align="right">
              <Row>
                <Column style={tableCell} align="right">
                  <Text style={productPriceTotal}>TOTAL</Text>
                </Column>
                <Column style={productPriceVerticalLine} />
                <Column style={productPriceLargeWrapper}>
                  <Text style={productPriceLarge}>
                    {numberToColombianPriceString(total)}
                  </Text>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

const QuoteEmailPreview = () => {
  return (
    <QuoteEmailTemplate
      data={{
        email: "julian.m.bustos@gmail.com",
        message: "asdasdasd",
        name: "juan Pereza",
        tel: "3001220367",
        selectedSurfaces: [
          {
            width: 60,
            height: 120,
            totalSurface: 500000,
            id: "9717989b-f990-4d7a-81c4-068921474942",
            code: "27",
            name: "Cuarzo Gris polar",
            image:
              "https://cdn.sanity.io/images/fwylo0af/development/0cbbed2c892c19d84ca1aa5bd75379e7ad9f1f68-3060x4080.jpg?rect=367,765,2693,2315",
            quantity: 1,
            formatPrice: 500000,
          },
          {
            width: 10,
            height: 10,
            totalSurface: 10000,
            id: "73e5f61e-b0ad-495f-a3df-f458e2e39227",
            code: "3",
            name: "Mármol Marron emperador",
            image:
              "https://cdn.sanity.io/images/fwylo0af/development/9ad7b81eba91aec5565cee8cc209db95fca66de5-800x533.jpg",
            quantity: 1,
            formatPrice: 10000,
          },
        ],
      }}
    />
  );
};
export default QuoteEmailPreview;
const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: "#ffffff",
};
const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "660px",
  maxWidth: "100%",
};
const heading = {
  fontSize: "32px",
  fontWeight: "300",
  color: "#888888",
};
const productIcon = {
  margin: "0 0 0 20px",
  borderRadius: "14px",
  border: "1px solid rgba(128,128,128,0.2)",
};
const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};
const productTitle = { fontSize: "12px", fontWeight: "600", ...resetText };
const productDescription = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  ...resetText,
};
const productPriceWrapper = {
  display: "table-cell",
  padding: "0px 20px 0px 0px",
  width: "100px",
  verticalAlign: "top",
};
const productPrice = {
  fontSize: "12px",
  fontWeight: "600",
  margin: "0",
};
const tableCell = { display: "table-cell" };
const productPriceVerticalLine = {
  height: "48px",
  borderLeft: "1px solid",
  borderColor: "rgb(238,238,238)",
};

const productPriceLarge = {
  margin: "0px 20px 0px 0px",
  fontSize: "16px",
  fontWeight: "600",
  whiteSpace: "nowrap" as const,
  textAlign: "right" as const,
};

const productPriceTotal = {
  margin: "0",
  color: "rgb(102,102,102)",
  fontSize: "10px",
  fontWeight: "600",
  padding: "0px 30px 0px 0px",
  textAlign: "right" as const,
};

const productPriceLargeWrapper = { display: "table-cell", width: "90px" };
