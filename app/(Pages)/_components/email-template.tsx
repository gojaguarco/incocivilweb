import {
  Html,
  Body,
  Text,
  Heading,
  Container,
  Tailwind,
  Link,
  Img,
  Row,
  Column,
  Section,
} from "@react-email/components";
import { numberToColombianPriceString } from "@/app/helpers";
import { SelectedSurfaces } from "../cotizador/captureInfoZods";

type ContactEmailTemplateProps = {
  data: {
    name: string;
    email: string;
    tel: string;
    message: string;
    adminData: {
      phone: string;
      email: string;
    };
  };
};

export const ContactEmailTemplate: React.FC<
  Readonly<ContactEmailTemplateProps>
> = ({ data }) => {
  return (
    <Tailwind>
      <Html>
        <Body>
          <Container>
            <Heading className=" text-white text-xl" style={{}}>
              {}
            </Heading>
            <Img
              className="ml-auto mr-auto object-contain"
              src={
                "https://cdn.sanity.io/images/fwylo0af/production/2dd6553c40fe2e378dbb347974e96801b946636f-467x292.svg?fit=max&q=80&w=720&fm=png"
              }
              alt="Incocivil Isologo"
              width="719"
              height="150"
            ></Img>
            <Img
              className="ml-auto mr-auto object-contain"
              src={
                "https://cdn.sanity.io/images/fwylo0af/production/3511480325e0be5033de106ae93824e88fc0672a-515x69.svg?fit=max&q=80&w=720&fm=png"
              }
              alt="Incocivil logo text"
              width="719"
              height="150"
            ></Img>
            <Heading>¡Gracias por tu Mensaje!</Heading>
            <Heading>
              Nos pondremos en contacto contigo tan pronto como nos sea posible.
            </Heading>
            <Text>Datos del Mensaje</Text>
            <Text>Envía: {data.name}</Text>
            <Text>Email: {data.email}</Text>
            <Text>Teléfono: {data.tel}</Text>
            <Text>Mensaje: {data.message}</Text>
            <Text>
              Para cualquier inquietud comunícate con nosotros a través de
              nuestra línea de atención al cliente:{" "}
            </Text>
            <Link
              href={`https://api.whatsapp.com/send/?phone=57${data.adminData.phone}&text=Hola%2C+he+enviado+un+mensaje+por+correo+electronico+y+quiero+recibir+informacion+adicional.+Mi+email+es+${data.email}.&type=phone_number&app_absent=0`}
            >
              Whatsapp {data.adminData.phone}
            </Link>
            <Text>
              O comunícate a través de nuestro correo electrónico:{" "}
              {data.adminData.email}
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

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
              className="ml-auto mr-auto object-contain"
              src={
                "https://cdn.sanity.io/images/fwylo0af/production/2dd6553c40fe2e378dbb347974e96801b946636f-467x292.svg?fit=max&q=80&w=720&fm=png"
              }
              alt="Incocivil Isologo"
              width="719"
              height="150"
            ></Img>
            <Img
              className="ml-auto mr-auto object-contain"
              src={
                "https://cdn.sanity.io/images/fwylo0af/production/3511480325e0be5033de106ae93824e88fc0672a-515x69.svg?fit=max&q=80&w=720&fm=png"
              }
              alt="Incocivil logo text"
              width="719"
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
                </Column>
                <Column style={productPriceWrapper} align="right">
                  <Text style={productPrice}>
                    Total cotizado:{" "}
                    {numberToColombianPriceString(surface.totalSurface)}
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
                  <Text style={productPriceLarge}>{numberToColombianPriceString(total)}</Text>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
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

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: "#ffffff",
};

const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
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

const productTitle = { fontSize: "12px", fontWeight: "600", ...resetText };

const productDescription = {
  fontSize: "12px",
  color: "rgb(102,102,102)",
  ...resetText,
};

const productPrice = {
  fontSize: "12px",
  fontWeight: "600",
  margin: "0",
};

const productPriceWrapper = {
  display: "table-cell",
  padding: "0px 20px 0px 0px",
  width: "100px",
  verticalAlign: "top",
};
