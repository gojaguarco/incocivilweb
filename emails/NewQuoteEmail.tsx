import { SelectedSurfaces } from "@/app/(Pages)/cotizador/captureInfoZods";
import { numberToColombianPriceString } from "@/app/helpers";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import type * as React from "react";

type QuoteEmailTemplateProps = {
  data: {
    name: string;
    email: string;
    tel: string;
    message?: string | null;
    selectedSurfaces: SelectedSurfaces;
  };
};

export const NewQuoteEmail: React.FC<Readonly<QuoteEmailTemplateProps>> = ({
  data,
}) => {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body style={main}>
          <Preview>Cotización</Preview>
          <Container style={container}>
            <Section style={message}>
              <Link href="https://incocivil.com" target="_blank">
                <Img
                  className="mx-auto max-w-[400px] object-contain"
                  src={
                    "https://cdn.sanity.io/images/fwylo0af/production/2dd6553c40fe2e378dbb347974e96801b946636f-467x292.svg?fit=max&q=80&w=400&fm=png"
                  }
                  alt="Incocivil Isologo"
                  width="300"
                  height="100"
                  style={{ margin: "auto" }}
                />
                <Img
                  className="ml-auto mr-auto object-contain"
                  src={
                    "https://cdn.sanity.io/images/fwylo0af/production/3511480325e0be5033de106ae93824e88fc0672a-515x69.svg?fit=max&q=80&w=400&fm=png"
                  }
                  alt="Incocivil logo text"
                  width="300"
                  height="100"
                ></Img>
              </Link>
              <Heading style={global.heading}>{"Cotización"}</Heading>
              <Text style={global.text}>Esta es tu cotización</Text>
            </Section>
            <Hr style={global.hr} />
            <Section style={global.defaultPadding}>
              <Text>Envía: {data.name}</Text>
              <Text>Email: {data.email}</Text>
              <Text>Teléfono: {data.tel}</Text>
              <Text>Mensaje: {data.message}</Text>
            </Section>
            <Hr style={global.hr} />
            <Section
              style={{ ...paddingX, paddingTop: "40px", paddingBottom: "40px" }}
            >
              {data.selectedSurfaces.map((surface) => (
                <Row key={surface.id} className="my-10">
                  <Column className="w-[50%]">
                    <Img
                      className="object-cover aspect-[9/16] max-w-[230px]"
                      src={surface.image}
                      // width="100"
                      // height="64"
                      alt={surface.name}
                      style={productIcon}
                    />
                  </Column>
                  <Column
                    className="w-[50%]"
                    style={{
                      // background: "blue",
                      verticalAlign: "top",
                      paddingLeft: "12px",
                    }}
                  >
                    <Text
                      className="capitalize"
                      style={{ ...paragraph, fontWeight: "500" }}
                    >
                      {surface.name
                        .toLowerCase()
                        .replace(surface.type.toLowerCase(), "")}{" "}
                    </Text>
                    <Text style={global.text}>Size L (12–14)</Text>
                    <Text className="code">
                      <strong>Código: </strong>
                      {surface.code}
                    </Text>

                    <Text>
                      <strong>Tipo de superficie: </strong>
                      {surface.type}
                    </Text>
                    <Text>
                      <strong>Cantidad: </strong>
                      {surface.quantity}
                    </Text>
                    <Text>
                      <strong>Precio m2: </strong>
                      {numberToColombianPriceString(surface.formatPrice)}
                    </Text>
                    <Text>
                      <strong>Total Superficie: </strong>
                      {numberToColombianPriceString(surface.totalSurface)}
                    </Text>
                    <Link
                      href={`https://incocivil.com/surface/${surface.id}`}
                      target="_blank"
                    >
                      Ver Superficie
                    </Link>
                  </Column>
                  <Hr style={global.hr} />
                </Row>
              ))}
            </Section>
            <Hr style={global.hr} />
            <Hr style={{ ...global.hr, marginTop: "12px" }} />
            <Section style={paddingY}>
              <Row>
                <Text
                  style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}
                >
                  Contáctanos si tienes preguntas{" "}
                </Text>
              </Row>
              <Row>
                <Text
                  style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}
                >
                  Aplican términos y condiciones.{" "}
                </Text>
              </Row>
              <Row>
                <Text style={footer.text}>
                  Nos pondremos en contacto contigo para una cotización formal
                </Text>
              </Row>
              <Row>
                <Text style={footer.text}>
                  @ 2025 Incocivil todos los derechos reservados
                </Text>
              </Row>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};
const NewQuoteEmailPreview = () => {
  return (
    <NewQuoteEmail
      data={{
        email: "julian.m.bustos@gmail.com",
        message: "asd asd as dasd asd ",
        name: "juan Pereza",
        tel: "3001220367",
        selectedSurfaces: [
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
            type: "Mármol",
          },
          {
            width: 10,
            height: 10,
            totalSurface: 10000,
            id: "4a087aa4-a732-4d28-81a4-b0aeb37814ef",
            code: "28",
            name: "Cuarzo Gris vulcano",
            image:
              "https://cdn.sanity.io/images/fwylo0af/development/5188c062c1b59249c65e5dff280b90c2a95e6512-3060x4080.jpg?rect=806,1010,2254,3070",
            quantity: 1,
            formatPrice: 10000,
            type: "Cuarzo",
          },
        ],
      }}
    />
  );
};
export default NewQuoteEmailPreview;

const productIcon = {
  margin: "0 0 0 20px",
  borderRadius: "14px",
  border: "1px solid rgba(128,128,128,0.2)",
};
const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};

const paddingY = {
  paddingTop: "22px",
  paddingBottom: "22px",
};

const paragraph = {
  margin: "0",
  lineHeight: "2",
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: "bold" },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
  } as React.CSSProperties,
  text: {
    ...paragraph,
    color: "#747474",
    fontWeight: "500",
  },
  button: {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
  } as React.CSSProperties,
  hr: {
    borderColor: "#E5E5E5",
    margin: "0",
  },
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "10px auto",
  width: "600px",
  maxWidth: "100%",
  border: "1px solid #E5E5E5",
};

const message = {
  padding: "40px 74px",
  textAlign: "center",
} as React.CSSProperties;

const footer = {
  policy: {
    width: "166px",
    margin: "auto",
  },
  text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
  } as React.CSSProperties,
};
