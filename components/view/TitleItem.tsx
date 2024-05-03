import { View, Text, useColorScheme, StyleProp, ViewStyle } from "react-native";
import React from "react";
import ButtonIcon from "../ButtonRoundedIcon";
import { router } from "expo-router";
import { Edit2, Undo2 } from "lucide-react-native";
import Colors from "@/constants/Colors";

interface Props {
   styleContainer?: StyleProp<ViewStyle>;
   title: string;
   onPressEdit: () => void;
}
const ViewHeader = ({ styleContainer, title, onPressEdit }: Props) => {
   const colorScheme = useColorScheme();
   const btnReturn = () => {
      router.back();
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

         <ButtonIcon onPress={onPressEdit} iconLucide={Edit2} />
      </View>
   );
};

export default ViewHeader;
