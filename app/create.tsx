import { View, Text, useColorScheme } from "react-native";
import React, { useContext, useState } from "react";
import ContainerCustom from "@/components/ContainerCustom";
import HeaderCustom from "@/components/HeaderCustom";
import { Link, router } from "expo-router";
import Colors from "@/constants/Colors";
import InputTextCustom from "@/components/InputTextCustom";
import InputPasswordCustom from "@/components/InputPasswordCustom";
import { VasSesionContext } from "@/contexts/Sesion.context";
import ButtonCustom from "@/components/ButtonCustom";
import { currentDateISO, validateEmail } from "@/utils/functions";
import { CreateAccountReqDto } from "@/apis/account/dto/requests/create-account-req.dto";
import { AccountService } from "@/apis/account/account.service";

const Create = () => {
   const { mostrarNotificacion, activarCarga } = useContext(VasSesionContext);
   const colorScheme = useColorScheme();
   const [email, setEmail] = useState<string>("");
   const [user, setUser] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [hidePassword, setHidePassword] = useState<boolean>(true);
   const [repeatPassword, setRepeatPassword] = useState<string>("");
   const [hideRepeatPassword, setHideRepeatPassword] = useState<boolean>(true);

   const funLimpiarFormulario = () => {
      setEmail("");
      setUser("");
      setPassword("");
      setRepeatPassword("");
   };
   const funEsDatosCorrectos = (): boolean => {
      if (!email) {
         mostrarNotificacion({ tipo: "warn", detalle: "Ingrese un correo" });
         return false;
      }

      if (email.length <= 10) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "correo inválido",
         });
         return false;
      }

      if (!validateEmail(email)) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "correo inválido",
         });
         return false;
      }

      if (!user) {
         mostrarNotificacion({ tipo: "warn", detalle: "Ingrese un usuario" });
         return false;
      }

      if (user.length <= 4) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "el nombre de usuario debe ser mínimo de 5 caracteres",
         });
         return false;
      }

      if (!password) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Ingrese una contraseña",
         });
         return false;
      }

      if (!repeatPassword) {
         mostrarNotificacion({ tipo: "warn", detalle: "Repita su contraseña" });
         return false;
      }

      if (password !== repeatPassword) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Las contraseñas deben ser iguales",
         });
         return false;
      }

      if (password.length <= 7) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "La contraseña debe debe ser mínimo de 8 caracteres",
         });
         return false;
      }
      return true;
   };
   const funCreateAccount = async () => {
      if (!funEsDatosCorrectos()) {
         return;
      }
      const data: CreateAccountReqDto = {
         UserName: user,
         Password: password,
         Email: email,
         CreationDate: currentDateISO(),
      };
      const srvAccount = new AccountService();

      activarCarga(true);
      await srvAccount
         .create(data)
         .then(() => {
            funLimpiarFormulario();
            router.replace({
               pathname: "/activate",
               params: { email: email },
            });
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   return (
      <ContainerCustom>
         <HeaderCustom title="Registro" isSecondaryPage={true} />

         <View
            style={{
               flex: 1,
               padding: 10,
               gap: 10,
               backgroundColor: Colors[colorScheme ?? "light"].container,
               borderTopLeftRadius: 20,
               borderTopRightRadius: 20,
            }}
         >
            <Text
               style={{
                  marginTop: 10,
                  fontSize: 30,
                  lineHeight: 32,
                  color: Colors[colorScheme ?? "light"].textTitle,
                  textAlign: "center",
                  fontFamily: "Poppins600",
               }}
            >
               Crea una cuenta
            </Text>
            <Text
               style={{
                  fontSize: 14,
                  lineHeight: 16,
                  color: Colors[colorScheme ?? "light"].textSubtitle,
                  textAlign: "center",
                  fontFamily: "Poppins400",
                  marginBottom: 20,
               }}
            >
               para comenzar ahora!
            </Text>
            <InputTextCustom
               styleInput={{ textTransform: "lowercase" }}
               title="Correo"
               placeholder="Escriba el correo"
               value={email}
               functionChangeText={setEmail}
               keyboardType="default"
               maxLength={30}
               inputIsRequired={true}
            />
            <InputTextCustom
               styleInput={{ textTransform: "lowercase" }}
               title="Usuario"
               placeholder="Escriba el usuario"
               value={user}
               functionChangeText={setUser}
               keyboardType="default"
               maxLength={30}
               inputIsRequired={true}
            />
            <InputPasswordCustom
               title="Contraseña"
               placeholder="Escriba la contraseña"
               value={password}
               functionChangeText={setPassword}
               activePassword={hidePassword}
               functionActivePassword={() => setHidePassword(!hidePassword)}
               inputIsRequired={true}
            />
            <InputPasswordCustom
               title="Repetir Contraseña"
               placeholder="Vuelva a escribir la contraseña"
               value={repeatPassword}
               functionChangeText={setRepeatPassword}
               activePassword={hideRepeatPassword}
               functionActivePassword={() =>
                  setHideRepeatPassword(!hideRepeatPassword)
               }
               inputIsRequired={true}
            />

            <ButtonCustom text="Crear Cuenta" onPress={funCreateAccount} />
            <View
               style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginVertical: 20,
               }}
            >
               <Text
                  style={{
                     color: Colors[colorScheme ?? "light"].text,
                     fontSize: 12,
                     marginLeft: 10,
                     fontFamily: "Poppins400",
                  }}
               >
                  Ya tienes una cuenta?
               </Text>
               <Link
                  href={"/"}
                  style={{
                     color: Colors[colorScheme ?? "light"].textLink,
                     fontSize: 12,
                     marginLeft: 10,
                     fontFamily: "Poppins400",
                     textDecorationLine: "underline",
                  }}
               >
                  <Text>Inicia Sesión</Text>
               </Link>
            </View>
         </View>
      </ContainerCustom>
   );
};

export default Create;
