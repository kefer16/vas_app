import { View, Text, useColorScheme, StyleProp, ViewStyle } from "react-native";
import React from "react";
import ButtonIcon from "../ButtonRoundedIcon";
import { Href, router } from "expo-router";
import { Edit2, Undo2 } from "lucide-react-native";
import Colors from "@/constants/Colors";

interface Props {
   styleContainer?: StyleProp<ViewStyle>;
   title: string;
   hrefButtonEdit: Href<string>;
}
const ViewHeader = ({ styleContainer, title, hrefButtonEdit }: Props) => {
   const colorScheme = useColorScheme();
   const btnReturn = () => {
      router.back();
   };
   const btnEdit = () => {
      router.push(hrefButtonEdit);
   };
   return (
      <View
         style={[
            {
               display: "flex",
               height: 50,
               flexDirection: "row",
               alignItems: "center",
               justifyContent: "space-between",
            },
            styleContainer,
         ]}
      >
         <ButtonIcon onPress={btnReturn} iconLucide={Undo2} />
         <Text
            style={[
               {
                  fontSize: 20,
                  lineHeight: 26,
                  color: Colors[colorScheme ?? "light"].buttonIconColor,
                  fontFamily: "Poppins700",
               },
            ]}
         >
            {title}
         </Text>

         <ButtonIcon onPress={btnEdit} iconLucide={Edit2} />
      </View>
   );
};

export default ViewHeader;
