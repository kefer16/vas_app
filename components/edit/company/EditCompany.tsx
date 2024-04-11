import { View, Text } from "react-native";
import React, { useState } from "react";
import InputText from "@/components/InputText";

const EditCompany = () => {
   const [fecha, setFecha] = useState<string>("");
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
            value={fecha}
            functionChangeText={setFecha}
         />
         <InputText
            title="Usuario"
            inputIsRequired
            value={fecha}
            functionChangeText={setFecha}
         />
         <InputText
            title="Activo"
            inputIsRequired
            value={fecha}
            functionChangeText={setFecha}
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
            value={fecha}
            functionChangeText={setFecha}
         />
         <InputText
            title="Nombre Completo"
            inputIsRequired
            value={fecha}
            functionChangeText={setFecha}
         />
         <InputText
            title="Descripción"
            value={fecha}
            functionChangeText={setFecha}
         />
         <InputText
            title="Correo"
            keyboardType="email-address"
            inputIsRequired
            value={fecha}
            functionChangeText={setFecha}
         />
         <InputText
            title="Página"
            keyboardType="url"
            value={fecha}
            functionChangeText={setFecha}
         />
      </View>
   );
};

export default EditCompany;
