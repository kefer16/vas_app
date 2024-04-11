import { View, Text, useColorScheme, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { router } from "expo-router";
import ButtonIcon from "./ButtonRoundedIcon";
import { Check, Undo2 } from "lucide-react-native";
import Colors from "@/constants/Colors";

interface Props {
   styeContainer?: StyleProp<ViewStyle>;
   title: string;
}
const EditHeader = ({ styeContainer, title }: Props) => {
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
               // backgroundColor: "red",
            },
            styeContainer,
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

         <ButtonIcon onPress={btnReturn} iconLucide={Check} />
      </View>
   );
};

export default EditHeader;
