import { View, Text, useColorScheme, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import { VasSesionContext } from "@/contexts/Sesion.context";
import ContainerCustom from "@/components/ContainerCustom";
import HeaderCustom from "@/components/HeaderCustom";
import Colors from "@/constants/Colors";
import ButtonCustom from "@/components/ButtonCustom";
import { Link, router, useLocalSearchParams } from "expo-router";
import InputCodeCustom from "@/components/InputCodeCustom";
import TextDescriptionCustom from "@/components/TextDescriptionCustom";
import TitleIconCustom from "@/components/TitleIconCustom";
import { AccountService } from "@/apis/account/account.service";
import { ActiveAccountReqDto } from "@/apis/account/dto/requests/active-account-req.dto";
import { currentDateISO } from "@/utils/functions";

const Activate = () => {
   const { activarCarga, mostrarNotificacion } = useContext(VasSesionContext);
   const { email } = useLocalSearchParams<{ email: string }>();
   const colorScheme = useColorScheme();
   const [code, setCode] = useState<string>("");

   const funActivateAccount = async () => {
      const srvAccount = new AccountService();
      const data: ActiveAccountReqDto = {
         CodeConfirmation: code,
         Email: email,
         CreationDate: currentDateISO(),
      };
      activarCarga(true);
      await srvAccount
         .activate(data)
         .then(() => {
            router.replace("/");
         })
         .catch((error: Error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });

      activarCarga(false);
   };

   return (
      <ContainerCustom>
         <HeaderCustom title="Registro" isSecondaryPage={true} />

         <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
               flex: 1,
            }}
         >
            <View
               style={{
                  flex: 1,
                  padding: 10,
                  backgroundColor: Colors[colorScheme ?? "light"].container,
               }}
            >
               <TitleIconCustom
                  style={{ marginBottom: 20 }}
                  iconName="mail"
                  text="Código de validación de Correo"
               />
               <TextDescriptionCustom
                  style={{ marginBottom: 20 }}
                  align="justify"
                  text="Hemos enviado un código de activación a tu correo electrónico, revisa tu bandeja de entrada o Correos no deseados"
               />

               <InputCodeCustom
                  style={{ marginBottom: 20 }}
                  valueChange={setCode}
               />
               <View
                  style={{
                     width: "100%",
                     display: "flex",
                     flexDirection: "row",
                     justifyContent: "flex-end",
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
                     No obtuviste el código?
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
                     <Text>Reenviar Código</Text>
                  </Link>
               </View>
               <ButtonCustom
                  text="Activar Cuenta"
                  onPress={funActivateAccount}
               />

               <View
                  style={{
                     width: "100%",
                     display: "flex",
                     flexDirection: "row",
                     justifyContent: "center",
                     marginTop: 30,
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
         </ScrollView>
      </ContainerCustom>
   );
};

export default Activate;
