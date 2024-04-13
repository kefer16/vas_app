import { createContext, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { DtoLoginAccountRes } from "@/apis/account/dto/responses/login-account-res.dto";
import { DtoCompanyRes } from "@/apis/companies/dto/responses/company.dto";
// import {  ToastAndroid } from "react-native";

export interface NotificacionProps {
   tipo: "success" | "info" | "warn" | "error" | undefined;
   detalle: string;
}
export interface InsteneSesionContextProps {
   vasSesion: DtoLoginAccountRes;
   companySesion: DtoCompanyRes;
   privilegio: privilegio;
   obtenerSesion: () => void;
   guardarSesion: (sesion: DtoLoginAccountRes) => void;
   cerrarSesion: () => void;
   mostrarNotificacion: (prosp: NotificacionProps) => void;
   activarCarga: (estado: boolean) => void;
   saveCompanySesion: (pCompany: DtoCompanyRes) => void;
}

export const VasSesionContext = createContext<InsteneSesionContextProps>(
   {} as InsteneSesionContextProps
);
export type privilegio = "ADM" | "USU" | "INV";

export const SesionProvider = ({ children }: any) => {
   const [privilegio, setPrivilegio] = useState<privilegio>("INV");
   const [vasSesion, setVasSesion] = useState<DtoLoginAccountRes>(
      {} as DtoLoginAccountRes
   );

   const [carga, setCarga] = useState<boolean>(false);
   const [companySesion, setCompanySesion] = useState<DtoCompanyRes>(
      new DtoCompanyRes()
   );

   const saveCompanySesion = async (pCompany: DtoCompanyRes) => {
      setCompanySesion(pCompany);
   };

   const activarCarga = (estado: boolean) => {
      setCarga(estado);
   };
   const obtenerSesion = async () => {
      let result;
      // if (Platform.OS === "web") {
      //    result = sessionStorage.getItem("sesion_vas");
      // } else {
      //    result = await SecureStore.getItemAsync("sesion_vas");
      // }

      if (result) {
         setVasSesion(JSON.parse(result));
         setPrivilegio(JSON.parse(result).cls_privilegio.abreviatura);
      }
   };

   const guardarSesion = async (sesion: DtoLoginAccountRes) => {
      sesion = {
         UserId: sesion.UserId,
         FirstName: sesion.FirstName,
         SecondName: sesion.SecondName,
         FirstLastName: sesion.FirstLastName,
         SecondLastName: sesion.SecondLastName,
         UserName: sesion.UserName,
         Email: sesion.Email,
         Photo: sesion.Photo,
      };

      // if (Platform.OS === "web") {
      //    sessionStorage.setItem("sesion_vas", JSON.stringify(sesion));
      // } else {
      //    await SecureStore.setItemAsync(
      //       "sesion_vas",
      //       JSON.stringify(sesion)
      //    );
      // }

      setVasSesion(sesion);
   };

   const cerrarSesion = () => {
      // if (Platform.OS === "web") {
      //    sessionStorage.removeItem("sesion_vas");
      // } else {
      //    SecureStore.deleteItemAsync("sesion_vas");
      // }

      setVasSesion(new DtoLoginAccountRes());
   };

   const mostrarNotificacion = ({ tipo, detalle }: NotificacionProps) => {
      let titulo = "";
      let pegado = false;

      if (detalle.substring(0, 6) === "[warn]") {
         tipo = "warn";
         detalle = detalle.substring(6);
      }

      if (tipo === "error") {
         titulo = "Error";
         pegado = true;
      }
      if (tipo === "warn") {
         titulo = "Alerta";
         pegado = false;
      }
      if (tipo === "success") {
         titulo = "Éxito";
         pegado = false;
      }

      //    ToastAndroid.showWithGravityAndOffset(
      //       detalle,
      //       ToastAndroid.LONG,
      //       ToastAndroid.CENTER,
      //       25,
      //       50
      //    );
      Alert.alert(titulo, detalle);
   };

   return (
      <VasSesionContext.Provider
         value={{
            vasSesion,
            companySesion,
            privilegio,
            obtenerSesion,
            guardarSesion,
            cerrarSesion,
            mostrarNotificacion,
            activarCarga,
            saveCompanySesion,
         }}
      >
         {children}

         {carga && (
            <View
               style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  backgroundColor: "#000000d6",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <ActivityIndicator size="large" color="#fff" />
            </View>
         )}
      </VasSesionContext.Provider>
   );
};
