import { View, Text, useColorScheme, StyleProp, ViewStyle } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface Props {
   style?: StyleProp<ViewStyle>;
   text: string;
   iconName: any;
}
const TitleIconCustom = ({ style, text, iconName }: Props) => {
   const colorScheme = useColorScheme();
   return (
      <View
         style={[
            {
               width: "100%",
               display: "flex",
               flexDirection: "column",
            },
            style,
         ]}
      >
         <Ionicons
            style={{
               color: Colors[colorScheme ?? "light"].text,
               textAlign: "center",
               fontSize: 30,
            }}
            name={iconName}
         />
         <Text
            style={{
               color: Colors[colorScheme ?? "light"].text,
               fontSize: 16,
               marginLeft: 10,
               fontFamily: "Poppins700",
               textAlign: "center",
            }}
         >
            {text}
         </Text>
      </View>
   );
};

export default TitleIconCustom;
