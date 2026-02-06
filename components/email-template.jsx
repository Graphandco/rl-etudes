import {
   Html,
   Head,
   Body,
   Container,
   Text,
   Heading,
} from "@react-email/components";

export const EmailTemplate = ({ name, email, phone, message, privacy }) => (
   <Html>
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif" }}>
         <Container
            style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
         >
            <Heading
               style={{ color: "#333", fontSize: "24px", marginBottom: "20px" }}
            >
               Nouveau message de {name}
            </Heading>

            <Text
               style={{ fontSize: "16px", lineHeight: "1.6", color: "#555" }}
            >
               <strong>Email :</strong> {email}
            </Text>

            <Text
               style={{ fontSize: "16px", lineHeight: "1.6", color: "#555" }}
            >
               <strong>Téléphone :</strong> {phone}
            </Text>

            <Text
               style={{ fontSize: "16px", lineHeight: "1.6", color: "#555" }}
            >
               <strong>Message :</strong>
            </Text>

            <Text
               style={{
                  fontSize: "16px",
                  lineHeight: "1.6",
                  color: "#555",
                  backgroundColor: "#f5f5f5",
                  padding: "15px",
                  borderRadius: "5px",
                  margin: "10px 0",
               }}
            >
               {message}
            </Text>

            <Text
               style={{ fontSize: "16px", lineHeight: "1.6", color: "#555" }}
            >
               <strong>Politique de confidentialité :</strong>{" "}
               {privacy ? "Acceptée" : "Non acceptée"}
            </Text>
         </Container>
      </Body>
   </Html>
);
