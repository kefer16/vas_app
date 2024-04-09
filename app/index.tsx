import { Text, View, useColorScheme, Image } from "react-native";
import InputTextCustom from "../components/InputTextCustom";
import { useState, useContext } from "react";
import InputPasswordCustom from "../components/InputPasswordCustom";
import ContainerCustom from "../components/ContainerCustom";
import Colors from "../constants/Colors";
import ButtonCustom from "../components/ButtonCustom";
import { VasSesionContext } from "@/contexts/Sesion.context";
import { Link, router } from "expo-router";
import CheckBoxCustom from "@/components/CheckBoxCustom";
import { AccountService } from "@/apis/account/account.service";
import { LoginAccountReqDto } from "@/apis/account/dto/requests/login-account-req.dto";
import { LoginAccountResDto } from "@/apis/account/dto/responses/login-account-res.dto";

export default function LoginScreen() {
   const { mostrarNotificacion, activarCarga } = useContext(VasSesionContext);

   const colorScheme = useColorScheme();

   const [usuario, setUsuario] = useState<string>("");
   const [IsRemenber, setIsRemenber] = useState<boolean>(false);
   const [esconderContrasenia, setEsconderContrasenia] =
      useState<boolean>(true);
   const [contrasenia, setContrasenia] = useState<string>("");

   const funLoginAccount = async () => {
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

      const srvAccount = new AccountService();
      const data: LoginAccountReqDto = {
         UserName: usuario,
         Password: contrasenia,
      };
      activarCarga(true);

      await srvAccount
         .login(data)
         .then((resp: LoginAccountResDto) => {
            console.log(resp);

            mostrarNotificacion({
               tipo: "success",
               detalle: `Hola Bienvenido ${resp.UserName}`,
            });

            // guardarSesion(resp);
            router.replace("/(home)/inicio/");
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   return (
      <ContainerCustom>
         <View
            style={{
               flex: 1,
               position: "relative",
               // marginTop: Constants.statusBarHeight,
               justifyContent: "center",
               alignItems: "center",
               marginHorizontal: "auto",
               width: "100%",
               height: 300,
               alignSelf: "center",
            }}
         >
            <Image
               style={{
                  width: "100%",
                  height: 300,
               }}
               blurRadius={4}
               source={require("../public/images/gestion.jpg")}
            />

            <View
               style={{
                  position: "absolute",
                  display: "flex",
                  top: 60,
                  alignItems: "center",
                  width: "100%",
               }}
            >
               <Image
                  style={{
                     width: 70,
                     height: 70,
                  }}
                  source={require("../public/images/favicon-vas.png")}
               />
            </View>

            <Image
               style={{
                  position: "absolute",
                  width: "100%",
                  bottom: 0,
               }}
               source={require("../public/images/vector.png")}
            />
         </View>

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
               marginBottom: 30,
            }}
         >
            tu app de gestión de proyectos
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
                  height: 20,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
               }}
            >
               <CheckBoxCustom
                  label="Recuérdame"
                  value={IsRemenber}
                  setValue={setIsRemenber}
               />
               <Text
                  style={{
                     width: "50%",
                     textAlign: "right",
                     color: Colors[colorScheme ?? "light"].textLink,
                     fontSize: 12,
                     fontFamily: "Poppins400",
                     textDecorationLine: "underline",
                  }}
               >
                  Has olvidado tu contraseña?
               </Text>
            </View>

            <ButtonCustom text="Iniciar Sesión" onPress={funLoginAccount} />

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
                  Aún no tienes cuenta?
               </Text>
               <Link
                  href="/create"
                  style={{
                     color: Colors[colorScheme ?? "light"].textLink,
                     fontSize: 12,
                     marginLeft: 10,
                     fontFamily: "Poppins400",
                     textDecorationLine: "underline",
                  }}
               >
                  <Text>Regístrate</Text>
               </Link>
            </View>
         </View>
      </ContainerCustom>
   );
}
