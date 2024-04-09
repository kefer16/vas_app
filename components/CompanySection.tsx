import { StyleProp, View, ViewStyle } from "react-native";
import React from "react";
import CompanyOption from "./CompanyOption";
import { CompanyRes } from "@/interfaces/responses/company-res.interface";

interface Props {
   styleContainer?: StyleProp<ViewStyle>;
   arrayCompanies: CompanyRes[];
}
const CompanySection = ({ styleContainer, arrayCompanies }: Props) => {
   return (
      <View style={styleContainer}>
         {arrayCompanies.map((item: CompanyRes) => {
            return (
               <CompanyOption
                  key={item.CompanyId}
                  textTitle={item.Name}
                  textDescription={item.Name}
                  onPress={() => {}}
               />
            );
         })}
      </View>
   );
};

export default CompanySection;
