import { View, ScrollView, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ContainerCustom from "@/components/ContainerCustom";
import ListHeader from "@/components/list/ListHeader";
import InputTextSearchCustom from "@/components/InputTextSearchCustom";
import Separator from "@/components/Separator";
import SubTitleList from "@/components/SubTitleList";
import ButtonAddList from "@/components/list/ButtonAddList";
import { VasSesionContext } from "@/contexts/Sesion.context";
import { router } from "expo-router";
import { ModuleService } from "@/apis/modules/module.service";
import { ModuleContext } from "@/contexts/Module.context";
import { DtoModulesRes } from "@/apis/modules/dto/responses/modules.dto";
import ModuleSection from "@/components/ModuleSection";

const index = () => {
   const { mostrarNotificacion, activarCarga } = useContext(VasSesionContext);
   const { sesionModules, saveSesionModules } = useContext(ModuleContext);
   const ScreenHeight = Dimensions.get("window").height;
   const BarHeight = 70;
   const [search, setSearch] = useState<string>("");
   const [arrayFilterModule, setArrayFilterModule] = useState<DtoModulesRes[]>(
      []
   );

   const getModuleService = async () => {
      if (sesionModules.length > 0) {
         setArrayFilterModule(sesionModules);
         return;
      }
      const srvModule = new ModuleService();
      activarCarga(true);
      await srvModule
         .getAll()
         .then((resp) => {
            saveSesionModules(resp);
            setArrayFilterModule(resp);
         })
         .catch((error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };
   const btnBuscar = (pValueSearch: string) => {
      setArrayFilterModule(
         sesionModules.filter((item) =>
            item.Name.trim()
               .toLowerCase()
               .includes(pValueSearch.trim().toLowerCase())
         )
      );
   };

   const loadView = () => {
      getModuleService();
   };

   useEffect(() => {
      loadView();
   }, [sesionModules]);

   const goAddCompany = () => {
      router.push({
         pathname: "/(home)/inicio/module/[id]/edit",
         params: { id: "-" },
      });
   };
   return (
      <ContainerCustom>
         <View
            style={{
               display: "flex",
               flexDirection: "column",
               gap: 10,
               backgroundColor: "transparent",
            }}
         >
            <ListHeader
               containerStyle={{ paddingHorizontal: 10 }}
               text="Módulo"
            />
            <InputTextSearchCustom
               containerStyle={{ paddingHorizontal: 10 }}
               value={search}
               keyboardType="web-search"
               funButtonSearch={() => btnBuscar(search)}
               functionChangeText={setSearch}
               placeholder="Buscar"
            />
            <Separator />
         </View>
         <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
               flex: 1,
            }}
         >
            <View
               style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  padding: 10,
                  gap: 10,
                  backgroundColor: "transparent",
                  height: "100%",
                  minHeight: ScreenHeight - BarHeight,
               }}
            >
               <SubTitleList text="Lista de Módulos" />
               <ModuleSection
                  array={arrayFilterModule}
                  styleContainer={{ gap: 10 }}
               />
            </View>
         </ScrollView>

         <ButtonAddList onPress={goAddCompany} />
      </ContainerCustom>
   );
};

export default index;
