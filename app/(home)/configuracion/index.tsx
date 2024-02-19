import { View, Text } from "react-native";
import { TouchableOpacity, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ButtonOptionCustom from "../../../components/ButtonOptionCustom";
import { router } from "expo-router";
import { useContext, useEffect } from "react";
import Colors from "../../../constants/Colors";
import ContainerCustom from "../../../components/ContainerCustom";
import HeaderCustom from "../../../components/HeaderCustom";
import TitleCustom from "../../../components/TitleCustom";
import { VasSesionContext } from "@/contexts/Sesion.context";

const index = () => {
   const { cerrarSesion } = useContext(VasSesionContext);

   const colorScheme = useColorScheme();

   useEffect(() => {}, []);

   const funCerrarSesion = () => {
      cerrarSesion();
      router.replace("/");
   };

   return (
      <ContainerCustom>
         <HeaderCustom title="Configuración" isSecondaryPage={false} />
         <View style={{ padding: 10, paddingVertical: 10, gap: 7 }}>
            <TitleCustom
               // textStyle={{ marginTop: 10 }}
               textSize={20}
               text="Usuario"
            />
            <ButtonOptionCustom
               iconName={"person-circle"}
               textTitle="Perfil"
               textDescription={"Editar perfil"}
               onPress={() => {}}
            />

            <TouchableOpacity
               style={{
                  padding: 15,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 10,
                  backgroundColor: Colors[colorScheme ?? "light"].card,
                  shadowColor: "#970606c7",
                  shadowOffset: { width: -2, height: 5 },
                  shadowOpacity: 0.5,
                  shadowRadius: 3,
                  elevation: 5,
               }}
               onPress={funCerrarSesion}
            >
               <Ionicons
                  style={{ marginRight: 10, fontSize: 25, color: "#EC3030" }}
                  name={"log-out"}
               />
               <Text
                  style={{
                     fontSize: 15,
                     fontFamily: "Poppins400",
                     color: "#EC3030",
                  }}
               >
                  Cerrar Sesión
               </Text>
            </TouchableOpacity>
            <Text
               style={{
                  padding: 15,
                  fontSize: 10,
                  fontFamily: "Poppins300",
                  color: "#6f6f6f",
               }}
            >
               Version 1.0.1
            </Text>
         </View>
      </ContainerCustom>
   );
};

export default index;
