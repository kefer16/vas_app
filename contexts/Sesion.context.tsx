import { createContext, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { LogeoUsuario } from "@/interfaces/responses/usuario-res.interface";
// import {  ToastAndroid } from "react-native";

export interface NotificacionProps {
   tipo: "success" | "info" | "warn" | "error" | undefined;
   detalle: string;
}
export interface InsteneSesionContextProps {
   vasSesion: LogeoUsuario;
   privilegio: privilegio;
   obtenerSesion: () => void;
   guardarSesion: (sesion: LogeoUsuario) => void;
   cerrarSesion: () => void;
   mostrarNotificacion: (prosp: NotificacionProps) => void;
   activarCarga: (estado: boolean) => void;
}

export const VasSesionContext = createContext<InsteneSesionContextProps>(
   {} as InsteneSesionContextProps
);
export type privilegio = "ADM" | "USU" | "INV";

export const SesionProvider = ({ children }: any) => {
   const [privilegio, setPrivilegio] = useState<privilegio>("INV");
   const [vasSesion, setVasSesion] = useState<LogeoUsuario>({} as LogeoUsuario);

   const [carga, setCarga] = useState<boolean>(false);

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

   const guardarSesion = async (sesion: LogeoUsuario) => {
      sesion = {
         usuario_id: sesion.usuario_id,
         usuario: sesion.usuario,
         correo: sesion.correo,
         nombre: sesion.nombre,
         apellido: sesion.apellido,
         direccion: sesion.direccion,
         telefono: sesion.telefono,
         foto: "",
         cls_privilegio: {
            privilegio_id: sesion.cls_privilegio.privilegio_id,
            tipo: sesion.cls_privilegio.tipo,
            abreviatura: sesion.cls_privilegio.abreviatura,
         },
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

      setVasSesion({
         usuario_id: "",
         usuario: "",
         correo: "",
         nombre: "",
         apellido: "",
         direccion: "",
         telefono: "",
         foto: "",
         cls_privilegio: {
            privilegio_id: "",
            tipo: "",
            abreviatura: "INV",
         },
      });
      setPrivilegio("INV");
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
            privilegio,
            obtenerSesion,
            guardarSesion,
            cerrarSesion,
            mostrarNotificacion,
            activarCarga,
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
