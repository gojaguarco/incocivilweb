import { Html, Body, Text, Heading, Container, Tailwind, Link, Img } from "@react-email/components";

type EmailTemplateProps = {
  data: {
    name: string,
    email: string,
    tel: string,
    message: string,
    adminData: {
      phone: string,
      email: string
    }
  };
};

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  data,
}) => {

  return (

    <Tailwind>

      <Html>
        <Body>
          <Container>
            <Heading className=" text-white text-xl" style={{ }}>{}</Heading>
            <Img className="ml-auto mr-auto object-contain" src={'https://cdn.sanity.io/images/fwylo0af/production/2dd6553c40fe2e378dbb347974e96801b946636f-467x292.svg?fit=max&q=80&w=720&fm=png'} alt="Incocivil Isologo" width="719" height="150"></Img>
            <Img className="ml-auto mr-auto object-contain" src={'https://cdn.sanity.io/images/fwylo0af/production/3511480325e0be5033de106ae93824e88fc0672a-515x69.svg?fit=max&q=80&w=720&fm=png'} alt="Incocivil logo text" width="719" height="150"></Img>
            <Heading>¡Gracias por tu Mensaje!</Heading>
            <Heading>Nos pondremos en contacto contigo tan pronto como nos sea posible.</Heading>
            <Text>Datos del Mensaje</Text>
            <Text>Envía: {data.name}</Text>
            <Text>Email: {data.email}</Text>
            <Text>Teléfono: {data.tel}</Text>
            <Text>Mensaje: {data.message}</Text>
            <Text>Para cualquier inquietud comunícate con nosotros a través de nuestra línea de atención al cliente: </Text>
            <Link href={`https://api.whatsapp.com/send/?phone=57${data.adminData.phone}&text=Hola%2C+he+enviado+un+mensaje+por+correo+electronico+y+quiero+recibir+informacion+adicional.+Mi+email+es+${data.email}.&type=phone_number&app_absent=0`}>Whatsapp {data.adminData.phone}</Link>
            <Text>O comunícate a través de nuestro correo electrónico: {data.adminData.email}</Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
};