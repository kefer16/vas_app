import { View, Text, useColorScheme, StyleProp, ViewStyle } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Href, Link } from "expo-router";
interface Props {
   styleContainer: StyleProp<ViewStyle>;
   title: string;
   href: Href<string>;
}

const SectionTitleComponent = ({ styleContainer, title, href }: Props) => {
   const colorScheme = useColorScheme();
   return (
      <View
         style={[
            {
               width: "100%",
               display: "flex",
               flexDirection: "row",
               justifyContent: "space-between",
            },
            styleContainer,
         ]}
      >
         <Text
            style={{
               color: Colors[colorScheme ?? "light"].text,
               fontFamily: "Poppins800",
               fontSize: 15,
            }}
         >
            {title}
         </Text>
         <Link
            href={href}
            style={{
               color: Colors[colorScheme ?? "light"].textSubtitle,
               fontFamily: "Poppins400",
               fontSize: 15,
            }}
         >
            Ver todo
         </Link>
      </View>
   );
};

export default SectionTitleComponent;
