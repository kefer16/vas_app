import { Text, View, useColorScheme, Platform } from "react-native";
import InputTextCustom from "../components/InputTextCustom";
import { useState, useContext } from "react";
import InputPasswordCustom from "../components/InputPasswordCustom";
import ContainerCustom from "../components/ContainerCustom";
import Colors from "../constants/Colors";
import ButtonCustom from "../components/ButtonCustom";
import { VasSesionContext } from "@/contexts/Sesion.context";
import { router } from "expo-router";

export default function LoginScreen() {
   const { mostrarNotificacion, activarCarga } = useContext(VasSesionContext);

   const colorScheme = useColorScheme();

   const [usuario, setUsuario] = useState<string>("");
   const [esconderContrasenia, setEsconderContrasenia] =
      useState<boolean>(true);
   const [contrasenia, setContrasenia] = useState<string>("");

   const funIniciarSesion = async () => {
      if (!usuario) {
         mostrarNotificacion({ tipo: "success", detalle: "Ingrese usuario" });

         return;
      }
      if (!contrasenia) {
         mostrarNotificacion({
            tipo: "success",
            detalle: "Ingrese una contraseña",
         });

         return;
      }

      // const srvUsuario = new UsuarioService();
      activarCarga(true);

      // await srvUsuario
      //    .logearse(usuario, contrasenia)
      //    .then((resp: LogeoUsuario) => {
      //       mostrarNotificacion({
      //          tipo: "success",
      //          detalle: `Hola Bienvenido ${resp.usuario}`,
      //       });

      //       guardarSesion(resp);
      //       router.replace("/(home)/inicio");
      //    })
      //    .catch((error: Error) => {
      //       mostrarNotificacion({ tipo: "error", detalle: error.message });
      //    });
      router.replace("/(home)/inicio");
      activarCarga(false);
   };

   return (
      <ContainerCustom>
         <View
            style={{
               flex: 1,
               justifyContent: "center",
               alignItems: "center",
               marginTop: Platform.OS === "android" ? 100 : 50,
               marginBottom: 50,
               marginHorizontal: "auto",
               width: "100%",
               height: 80,
               alignSelf: "center",
            }}
         ></View>

         <Text
            style={{
               fontSize: 30,
               lineHeight: 36,
               color: Colors[colorScheme ?? "light"].textTitle,
               textAlign: "center",
               fontFamily: "Poppins600",
            }}
         >
            Bienvenido a Vas
         </Text>
         <Text
            style={{
               fontSize: 14,
               lineHeight: 18,
               color: Colors[colorScheme ?? "light"].textSubtitle,
               textAlign: "center",
               fontFamily: "Poppins400",
               marginBottom: 50,
            }}
         >
            por favor, ingresa tus datos
         </Text>

         <View
            style={{
               flex: 1,
               flexDirection: "column",
               paddingHorizontal: 20,
               gap: 10,
            }}
         >
            <InputTextCustom
               styleInput={{ textTransform: "lowercase" }}
               title="Usuario"
               placeholder="Ingrese usuario"
               value={usuario}
               functionChangeText={setUsuario}
               keyboardType="default"
               maxLength={15}
            />

            <InputPasswordCustom
               title="Contraseña"
               placeholder="Ingrese contraseña"
               value={contrasenia}
               functionChangeText={setContrasenia}
               activePassword={esconderContrasenia}
               functionActivePassword={() =>
                  setEsconderContrasenia(!esconderContrasenia)
               }
            />

            <View
               style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
               }}
            >
               <Text
                  style={{
                     width: "50%",
                     textAlign: "left",
                     color: Colors[colorScheme ?? "light"].text,
                     fontSize: 12,
                     fontFamily: "Poppins400",
                  }}
               >
                  ✅Recuérdame
               </Text>
               <Text
                  style={{
                     width: "50%",
                     textAlign: "right",
                     color: Colors[colorScheme ?? "light"].textLink,
                     fontSize: 12,
                     fontFamily: "Poppins400",
                  }}
               >
                  Has olvidado tu contraseña?
               </Text>
            </View>

            <ButtonCustom text="Iniciar Sesión" onPress={funIniciarSesion} />

            <View
               style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 20,
               }}
            >
               <Text
                  style={{
                     color: Colors[colorScheme ?? "light"].text,
                     fontSize: 12,
                     fontFamily: "Poppins400",
                  }}
               >
                  Nuevo aquí?
               </Text>
               <Text
                  style={{
                     color: Colors[colorScheme ?? "light"].textLink,
                     fontSize: 12,
                     marginLeft: 10,
                     fontFamily: "Poppins400",
                     textDecorationLine: "underline",
                  }}
               >
                  Create una cuenta
               </Text>
            </View>
         </View>
      </ContainerCustom>
   );
}
