import { View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import ContainerCustom from "@/components/ContainerCustom";

import TitleItem from "@/components/TitleItem";
import Separator from "@/components/Separator";
import ViewCardItem, {
   EnuViewCardItem,
   ItfViewCardItem,
} from "@/components/ViewCardItem";
import ViewIconItem from "@/components/ViewIconItem";
import { Building2 } from "lucide-react-native";
import ViewOptionsGroup from "@/components/ViewOptionsGroup";

const index = () => {
   const { id } = useLocalSearchParams<{ id: string }>();
   const nombre = "Facebook";
   const nombreCompleto = "Facebook SAC";
   const descripcion = "Red social para jovenes";
   const activo = "Activo";
   const correo = "facebook@gmail.com";
   const pagina = "https://facebook.com";

   const arrayView1: ItfViewCardItem[] = [
      {
         key: "11",
         type: EnuViewCardItem.STRING,
         title: "Fecha Creación",
         value: "09/04/2024 00:00",
      },
      {
         key: "12",
         type: EnuViewCardItem.STRING,
         title: "Usuario Creación",
         value: "Kevin Morales",
      },
      {
         key: "14",
         type: EnuViewCardItem.STRING,
         title: "Activo",
         value: activo,
      },
   ];

   const arrayView: ItfViewCardItem[] = [
      {
         key: "1",
         type: EnuViewCardItem.STRING,
         title: "Nombre Completo",
         value: nombreCompleto,
      },
      {
         key: "2",
         type: EnuViewCardItem.STRING,
         title: "Descripcion",
         value: descripcion,
      },

      {
         key: "4",
         type: EnuViewCardItem.STRING,
         title: "Correo",
         value: correo,
      },
      {
         key: "5",
         type: EnuViewCardItem.STRING,
         title: "Página",
         value: pagina,
      },
   ];
   return (
      <ContainerCustom>
         <TitleItem styleContainer={{ paddingHorizontal: 10 }} title={nombre} />
         <Separator />
         <View
            style={{
               display: "flex",
               flexDirection: "column",
               padding: 10,
               gap: 10,
            }}
         >
            <ViewIconItem iconLucide={Building2} title={nombre} />
            <ViewOptionsGroup />
            <ViewCardItem arrayView={arrayView1} />
            <ViewCardItem arrayView={arrayView} />
         </View>
      </ContainerCustom>
   );
};

export default index;
