import { StyleProp, Text, TextStyle, useColorScheme } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

interface Props {
   style?: StyleProp<TextStyle>;
   text: string;
   align: "auto" | "left" | "right" | "center" | "justify" | undefined;
}
const TextDescriptionCustom = ({ style, text, align }: Props) => {
   const colorScheme = useColorScheme();
   return (
      <Text
         style={[
            {
               fontSize: 14,
               lineHeight: 18,
               color: Colors[colorScheme ?? "light"].textSubtitle,
               textAlign: align,
               fontFamily: "Poppins300",
            },
            style,
         ]}
      >
         {text}
      </Text>
   );
};

export default TextDescriptionCustom;
