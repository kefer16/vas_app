import { StyleProp, View, ViewStyle } from "react-native";
import React from "react";
import { router } from "expo-router";
import { DtoModulesRes } from "@/apis/modules/dto/responses/modules.dto";
import ModuleOption from "./ModuleOption";

interface Props {
   styleContainer?: StyleProp<ViewStyle>;
   array: DtoModulesRes[];
}
const ModuleSection = ({ styleContainer, array }: Props) => {
   const onPress = (pId: string) => {
      router.push(`/(home)/inicio/module/view/?id=${pId}`);
   };
   return (
      <View style={styleContainer}>
         {array.map((item: DtoModulesRes) => {
            return (
               <ModuleOption
                  key={item.ModuleId}
                  textTitle={item.Name}
                  textDescription={item.DtoCompany.ShortName}
                  onPress={() => onPress(item.ModuleId)}
               />
            );
         })}
      </View>
   );
};

export default ModuleSection;
