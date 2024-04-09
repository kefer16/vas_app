import { View, Text, StyleProp, TextStyle, useColorScheme } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
interface Props {
   textStyle?: StyleProp<TextStyle>;
   text: string;
}
const SubTitleList = ({ textStyle, text }: Props) => {
   const colorScheme = useColorScheme();
   return (
      <View
         style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
         }}
      >
         <Text
            style={[
               {
                  fontSize: 18,
                  lineHeight: 26,
                  color: Colors[colorScheme ?? "light"].textTitle,
                  fontFamily: "Poppins700",
               },
               textStyle,
            ]}
         >
            {text}
         </Text>
      </View>
   );
};

export default SubTitleList;
