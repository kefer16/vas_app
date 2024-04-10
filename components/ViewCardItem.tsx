import { View, Text, useColorScheme } from "react-native";
import React from "react";
import Separator from "./Separator";
import Colors from "@/constants/Colors";

export enum EnuViewCardItem {
   DATE = "DATE",
   STRING = "STRING",
}

export interface ItfViewCardItem {
   key: string;
   type: EnuViewCardItem;
   title: string;
   value: string;
}

interface Props {
   arrayView: ItfViewCardItem[];
}
const ViewCardItem = ({ arrayView }: Props) => {
   const colorScheme = useColorScheme();
   return (
      <View
         style={{
            backgroundColor: Colors[colorScheme ?? "light"].viewCardBackground,
            borderRadius: 10,
            overflow: "hidden",
         }}
      >
         {arrayView.map((item: ItfViewCardItem, index: number) => {
            return (
               <View
                  key={item.key}
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     backgroundColor: "transparent",
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
                           color: Colors[colorScheme ?? "light"].viewCardTitle,
                           fontSize: 10,
                           lineHeight: 12,
                           fontFamily: "Poppins600",
                        }}
                     >
                        {item.title}
                     </Text>
                     <Text
                        selectable={true}
                        style={{
                           color: Colors[colorScheme ?? "light"]
                              .viewCardSubTitle,
                           fontSize: 14,
                           lineHeight: 16,
                           fontFamily: "Poppins300",
                        }}
                     >
                        {item.value}
                     </Text>
                  </View>
                  {arrayView.length - 1 > index && <Separator />}
               </View>
            );
         })}
      </View>
   );
};

export default ViewCardItem;
