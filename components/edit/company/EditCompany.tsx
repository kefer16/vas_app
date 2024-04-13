import { View, Text } from "react-native";
import React, { Dispatch } from "react";
import InputText from "@/components/InputText";
interface Props {
   form: FormProps;
}

export interface FormProps {
   stateValue: string;
   setFunctionValue: Dispatch<React.SetStateAction<string>>;
}
const EditCompany = ({ form }: Props) => {
   // const [formCompany, setCompa] = useState<>

   // const [date, setDate] = useState<string>("");
   // const [user, setUser] = useState<string>("");
   // const [active, setActive] = useState<string>("");

   // const [shortName, setShortName] = useState<string>("");
   // const [fullName, setFullName] = useState<string>("");
   // const [description, setDescription] = useState<string>("");
   // const [email, setEmail] = useState<string>("");
   // const [page, setPage] = useState<string>("");

   return (
      <View
         style={{
            display: "flex",
            flexDirection: "column",
            padding: 10,
            gap: 10,
         }}
      >
         <Text
            style={{
               fontFamily: "Poppins700",
               fontSize: 15,
            }}
         >
            Datos Sistema
         </Text>
         <InputText
            title="Fecha"
            inputIsRequired
            value={formValue.CreationDate}
            functionChangeText={formSetFunction}
         />
         <InputText
            title="Usuario"
            inputIsRequired
            value={user}
            functionChangeText={setUser}
         />
         <InputText
            title="Activo"
            inputIsRequired
            value={active}
            functionChangeText={setActive}
         />
         <Text
            style={{
               fontFamily: "Poppins700",
               fontSize: 15,
            }}
         >
            Datos Principales
         </Text>
         <InputText
            title="Nombre Corto"
            inputIsRequired
            value={shortName}
            functionChangeText={setShortName}
         />
         <InputText
            title="Nombre Completo"
            inputIsRequired
            value={fullName}
            functionChangeText={setFullName}
         />
         <InputText
            title="Descripción"
            value={description}
            functionChangeText={setDescription}
         />
         <InputText
            title="Correo"
            keyboardType="email-address"
            inputIsRequired
            value={email}
            functionChangeText={setEmail}
         />
         <InputText
            title="Página"
            keyboardType="url"
            value={page}
            functionChangeText={setPage}
         />
      </View>
   );
};

export default EditCompany;
