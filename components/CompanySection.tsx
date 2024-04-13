import { StyleProp, View, ViewStyle } from "react-native";
import React from "react";
import CompanyOption from "./CompanyOption";
import { router } from "expo-router";
import { DtoCompanyRes } from "@/apis/companies/dto/responses/company.dto";

interface Props {
   styleContainer?: StyleProp<ViewStyle>;
   arrayCompanies: DtoCompanyRes[];
}
const CompanySection = ({ styleContainer, arrayCompanies }: Props) => {
   const onPress = (pid: string) => {
      router.push(`/(home)/inicio/company/view/${pid}`);
   };
   return (
      <View style={styleContainer}>
         {arrayCompanies.map((item: DtoCompanyRes) => {
            return (
               <CompanyOption
                  key={item.CompanyId}
                  textTitle={item.ShortName}
                  textDescription={item.Description}
                  onPress={() => onPress(item.CompanyId)}
               />
            );
         })}
      </View>
   );
};

export default CompanySection;
