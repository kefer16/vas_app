import React, { useEffect, useState } from "react";
import ContainerCustom from "@/components/ContainerCustom";
import { View } from "@/components/Themed";
import InputTextSearchCustom from "@/components/InputTextSearchCustom";
import TitleList from "@/components/TitleList";
import CompanySection from "@/components/CompanySection";
import ButtonIcon from "@/components/ButtonIcon";
import { Dimensions } from "react-native";
import SubTitleList from "@/components/SubTitleList";
import Separator from "@/components/Separator";
import { CompanyRes } from "@/interfaces/responses/company-res.interface";

const index = () => {
   const ScreenHeight = Dimensions.get("window").height;
   const BarHeight = 70;
   const [search, setSearch] = useState<string>("");
   const [arrayCompany, setArrayCompany] = useState<CompanyRes[]>([]);
   const [arrayFilterCompany, setArrayFilterCompany] = useState<CompanyRes[]>(
      []
   );
   const btnBuscar = (pValueSearch: string) => {
      setArrayFilterCompany(
         arrayCompany.filter((item) =>
            item.Name.trim()
               .toLowerCase()
               .includes(pValueSearch.trim().toLowerCase())
         )
      );
   };

   const loadInitialValues = () => {
      const array = [
         {
            CompanyId: "1",
            Name: "Google",
            Email: "email@com",
            IsActive: true,
            CreationDate: new Date(),
         },
         {
            CompanyId: "2",
            Name: "Facebook",
            Email: "email@com",
            IsActive: true,
            CreationDate: new Date(),
         },
         {
            CompanyId: "3",
            Name: "Tiktok",
            Email: "email@com",
            IsActive: true,
            CreationDate: new Date(),
         },
      ];
      setArrayCompany(array);
      setArrayFilterCompany(array);
   };

   useEffect(() => {
      loadInitialValues();
   }, []);
   return (
      <ContainerCustom>
         <View
            style={{
               width: "100%",
               paddingHorizontal: 10,
               paddingVertical: 10,
               gap: 10,
               backgroundColor: "transparent",
               height: "100%",
               minHeight: ScreenHeight - BarHeight,
            }}
         >
            <TitleList text="Compañia" />

            <InputTextSearchCustom
               value={search}
               keyboardType="web-search"
               funButtonSearch={() => btnBuscar(search)}
               functionChangeText={setSearch}
               placeholder="Buscar"
            />
            <Separator />
            <SubTitleList text="Lista de Compañias" />
            <CompanySection
               arrayCompanies={arrayFilterCompany}
               styleContainer={{ gap: 10 }}
            />
         </View>
         <View
            style={{
               position: "absolute",
               width: "100%",
               zIndex: 9,
               padding: 10,
               bottom: 0,
               left: 0,
               backgroundColor: "transparent",
            }}
         >
            <ButtonIcon
               text="Agregar Compañia"
               onPress={() => {}}
               isEnabled={true}
            />
         </View>
      </ContainerCustom>
   );
};

export default index;
