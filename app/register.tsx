import { View, Text, useColorScheme, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import ContainerCustom from "@/components/ContainerCustom";
import HeaderCustom from "@/components/HeaderCustom";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import InputTextCustom from "@/components/InputTextCustom";
import InputPasswordCustom from "@/components/InputPasswordCustom";
import { VasSesionContext } from "@/contexts/Sesion.context";
import ButtonCustom from "@/components/ButtonCustom";

const Register = () => {
   const { mostrarNotificacion, activarCarga } = useContext(VasSesionContext);
   const colorScheme = useColorScheme();
   const [correo, setCorreo] = useState<string>("");
   const [usuario, setUsuario] = useState<string>("");
   const [contrasenia, setContrasenia] = useState<string>("");
   const [esconderContrasenia, setEsconderContrasenia] =
      useState<boolean>(true);
   const [repetirContrasenia, setRepetirContrasenia] = useState<string>("");
   const [esconderRepetirContrasenia, setEsconderRepetirContrasenia] =
      useState<boolean>(true);

   const funLimpiarFormulario = () => {
      setCorreo("");
      setUsuario("");
      setContrasenia("");
      setRepetirContrasenia("");
   };
   const funEsDatosCorrectos = (): boolean => {
      if (!correo) {
         mostrarNotificacion({ tipo: "warn", detalle: "Ingrese un correo" });
         return false;
      }

      if (!usuario) {
         mostrarNotificacion({ tipo: "warn", detalle: "Ingrese un usuario" });
         return false;
      }

      if (!contrasenia) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Ingrese una contraseña",
         });
         return false;
      }

      if (!repetirContrasenia) {
         mostrarNotificacion({ tipo: "warn", detalle: "Repita su contraseña" });
         return false;
      }

      if (contrasenia !== repetirContrasenia) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Las contraseñas deben ser iguales",
         });
         return false;
      }

      if (contrasenia.length <= 7) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "La contraseña debe debe ser mínimo de 8 caracteres",
         });
         return false;
      }
      return true;
   };
   const funCrearCuenta = async () => {
      if (!funEsDatosCorrectos()) {
         return;
      }
      // const data: = new da;

      // activarCarga(true);
      // await srvUsuario
      //    .registrarIndividual(data)
      //    .then(() => {
      //       mostrarNotificacion({
      //          tipo: "success",
      //          detalle: "Se creó la cuenta correctamente, ahora Inicia Sesión",
      //       });
      //       funLimpiarFormulario();
      //    })
      //    .catch((error: Error) => {
      //       mostrarNotificacion({ tipo: "error", detalle: error.message });
      //    });
      activarCarga(false);
   };

   return (
      <ContainerCustom>
         <HeaderCustom title="Registro" isSecondaryPage={true} urlBack="/" />

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
               value={correo}
               functionChangeText={setCorreo}
               keyboardType="default"
               maxLength={30}
               inputIsRequired={true}
            />
            <InputTextCustom
               styleInput={{ textTransform: "lowercase" }}
               title="Usuario"
               placeholder="Escriba el usuario"
               value={usuario}
               functionChangeText={setUsuario}
               keyboardType="default"
               maxLength={30}
               inputIsRequired={true}
            />
            <InputPasswordCustom
               title="Contraseña"
               placeholder="Escriba la contraseña"
               value={contrasenia}
               functionChangeText={setContrasenia}
               activePassword={esconderContrasenia}
               functionActivePassword={() =>
                  setEsconderContrasenia(!esconderContrasenia)
               }
               inputIsRequired={true}
            />
            <InputPasswordCustom
               title="Repetir Contraseña"
               placeholder="Vuelva a escribir la contraseña"
               value={repetirContrasenia}
               functionChangeText={setRepetirContrasenia}
               activePassword={esconderRepetirContrasenia}
               functionActivePassword={() =>
                  setEsconderRepetirContrasenia(!esconderRepetirContrasenia)
               }
               inputIsRequired={true}
            />

            <ButtonCustom text="Crear Cuenta" onPress={funCrearCuenta} />
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

export default Register;
