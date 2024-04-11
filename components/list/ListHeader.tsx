import { View, Text, StyleProp, TextStyle, useColorScheme } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { EllipsisVertical, Undo2 } from "lucide-react-native";
import { router } from "expo-router";
import ButtonIcon from "../ButtonRoundedIcon";
interface Props {
   textStyle?: StyleProp<TextStyle>;
   text: string;
}
const ListHeader = ({ textStyle, text }: Props) => {
   const colorScheme = useColorScheme();
   const btnReturn = () => {
      router.back();
   };
   return (
      <View
         style={{
            display: "flex",
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // backgroundColor: "red",
         }}
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
               textStyle,
            ]}
         >
            {text}
         </Text>

         <ButtonIcon onPress={btnReturn} iconLucide={EllipsisVertical} />
      </View>
   );
};

export default ListHeader;
