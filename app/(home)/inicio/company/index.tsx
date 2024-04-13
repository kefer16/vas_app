import React, { useContext, useEffect, useState } from "react";
import ContainerCustom from "@/components/ContainerCustom";
import { View } from "@/components/Themed";
import InputTextSearchCustom from "@/components/InputTextSearchCustom";
import ListHeader from "@/components/list/ListHeader";
import CompanySection from "@/components/CompanySection";
import { Dimensions, ScrollView } from "react-native";
import SubTitleList from "@/components/SubTitleList";
import Separator from "@/components/Separator";
import { CompanyService } from "@/apis/companies/company.service";
import { DtoCompanyRes } from "@/apis/companies/dto/responses/company.dto";
import { VasSesionContext } from "@/contexts/Sesion.context";
import ButtonAddList from "@/components/list/ButtonAddList";
import { router } from "expo-router";

const index = () => {
   const { mostrarNotificacion, activarCarga } = useContext(VasSesionContext);
   const ScreenHeight = Dimensions.get("window").height;
   const BarHeight = 70;
   const [search, setSearch] = useState<string>("");
   const [arrayCompany, setArrayCompany] = useState<DtoCompanyRes[]>([]);
   const [arrayFilterCompany, setArrayFilterCompany] = useState<
      DtoCompanyRes[]
   >([]);

   const getCompanyService = async () => {
      const srvCompany = new CompanyService();
      activarCarga(true);
      await srvCompany
         .getAll()
         .then((resp) => {
            setArrayCompany(resp);
            setArrayFilterCompany(resp);
         })
         .catch((error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };
   const btnBuscar = (pValueSearch: string) => {
      setArrayFilterCompany(
         arrayCompany.filter((item) =>
            item.ShortName.trim()
               .toLowerCase()
               .includes(pValueSearch.trim().toLowerCase())
         )
      );
   };

   const loadView = () => {
      getCompanyService();
   };

   useEffect(() => {
      loadView();
   }, []);

   const goAddCompany = () => {
      router.push("/(home)/inicio/company/edit/-");
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
               text="Compañia"
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
               <SubTitleList text="Lista de Compañias" />
               <CompanySection
                  arrayCompanies={arrayFilterCompany}
                  styleContainer={{ gap: 10 }}
               />
            </View>
         </ScrollView>

         <ButtonAddList onPress={goAddCompany} />
      </ContainerCustom>
   );
};

export default index;
