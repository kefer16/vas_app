import { StyleProp, View, ViewStyle } from "react-native";
import React from "react";
import CompanyOption from "./CompanyOption";
import { CompanyRes } from "@/interfaces/responses/company-res.interface";
import { router } from "expo-router";

interface Props {
   styleContainer?: StyleProp<ViewStyle>;
   arrayCompanies: CompanyRes[];
}
const CompanySection = ({ styleContainer, arrayCompanies }: Props) => {
   const onPress = (pid: string) => {
      router.push(`/(home)/inicio/company/view/${pid}`);
   };
   return (
      <View style={styleContainer}>
         {arrayCompanies.map((item: CompanyRes) => {
            return (
               <CompanyOption
                  key={item.CompanyId}
                  textTitle={item.Name}
                  textDescription={item.Name}
                  onPress={() => onPress(item.CompanyId)}
               />
            );
         })}
      </View>
   );
};

export default CompanySection;
