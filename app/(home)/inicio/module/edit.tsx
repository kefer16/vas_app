import { View, Text, useColorScheme, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { VasSesionContext } from "@/contexts/Sesion.context";
import ContainerCustom from "@/components/ContainerCustom";
import EditHeader from "@/components/EditHeader";
import Separator from "@/components/Separator";
import InputText from "@/components/InputText";
import Colors from "@/constants/Colors";
import { currentDateISO } from "@/utils/functions";
import { ModuleService } from "@/apis/modules/module.service";
import { CreateModuleReq } from "@/apis/modules/dto/requests/create-module.dto";
import { ModuleContext } from "@/contexts/Module.context";
import { UpdateModuleReq } from "@/apis/modules/dto/requests/update-module.dto";
import { DtoModulesRes } from "@/apis/modules/dto/responses/modules.dto";
import { DtoLoginAccountRes } from "@/apis/account/dto/responses/login-account-res.dto";

const edit = () => {
   const colorScheme = useColorScheme();
   const { mostrarNotificacion, activarCarga, vasSesion } =
      useContext(VasSesionContext);
   const { sesionModules, saveSesionModules } = useContext(ModuleContext);

   const { id } = useLocalSearchParams<{ id: string }>();

   const [date, setDate] = useState<string>("");
   const [userName, setUserName] = useState<string>("");
   const [active, setActive] = useState<string>("");

   const [name, setName] = useState<string>("");
   const [fkCompany, setFkCompany] = useState<string>("");

   const createModuleService = async () => {
      const srvModule = new ModuleService();
      const data: CreateModuleReq = {
         Name: name,
         IsActive: true,
         FkCompanyId: "E6CD5BF2-D184-441A-B6E4-2BE1EAD80A1D",
         CreationDate: currentDateISO(),
         FkUserId: vasSesion.UserId,
      };
      activarCarga(true);
      await srvModule
         .create(data)
         .then((resp) => {
            const array = sesionModules;
            console.log("resp: ", resp);

            array.push(resp);
            saveSesionModules([...array]);
            router.back();
         })
         .catch((error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   const updateModuleService = async () => {
      const srvModule = new ModuleService();
      const data: UpdateModuleReq = {
         Name: name,
         FkCompanyId: fkCompany,
         IsActive: true,
      };
      activarCarga(true);
      await srvModule
         .update(id, data)
         .then((resp) => {
            const array = sesionModules.filter((item) => item.ModuleId !== id);
            array.push(resp);
            saveSesionModules([...array]);
            router.back();
         })
         .catch((error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   const getModuleService = () => {
      const data =
         sesionModules.find((item) => item.ModuleId === id) ??
         new DtoModulesRes();
      if (data.ModuleId === id) {
         setDate(data.CreationDate);
         setUserName(data.DtoUser.UserName);
         setActive(data.IsActive ? "Active" : "Inactivo");
         setName(data.Name);
      }
   };

   const loadView = (pSesion: DtoLoginAccountRes) => {
      if (id === "-") {
         setDate(currentDateISO());
         setUserName(pSesion.UserName);
         setActive("Activo");
      } else {
         getModuleService();
      }
   };

   useEffect(() => {
      loadView(vasSesion);
   }, []);

   const btnCheck = () => {
      if (id === "-") {
         createModuleService();
      } else {
         updateModuleService();
      }
   };

   return (
      <ContainerCustom>
         <EditHeader
            styeContainer={{ paddingHorizontal: 10 }}
            title={id === "-" ? "Crear Compañia" : "Actualizar Compañia"}
            functionBtnCheck={btnCheck}
         />
         <Separator />
         <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
               flex: 1,
            }}
         >
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
                     color: Colors[colorScheme ?? "light"].text,
                  }}
               >
                  Datos Sistema
               </Text>
               <InputText
                  title="Fecha"
                  inputIsRequired
                  value={date}
                  functionChangeText={setDate}
               />
               <InputText
                  title="Usuario"
                  inputIsRequired
                  value={userName}
                  functionChangeText={setUserName}
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
                     color: Colors[colorScheme ?? "light"].text,
                  }}
               >
                  Datos Principales
               </Text>
               <InputText
                  title="Nombre Corto"
                  inputIsRequired
                  value={name}
                  functionChangeText={setName}
               />
               <InputText
                  title="Fk Company"
                  inputIsRequired
                  value={fkCompany}
                  functionChangeText={setFkCompany}
               />
            </View>
         </ScrollView>
      </ContainerCustom>
   );
};

export default edit;
