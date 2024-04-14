import { StyleProp, Text, View, ViewStyle, useColorScheme } from "react-native";
import React from "react";
import { LucideIcon } from "lucide-react-native";
import Colors from "@/constants/Colors";
interface Props {
   styleContainer?: StyleProp<ViewStyle>;
   title: string;
   iconLucide: LucideIcon;
}
const ViewIconItem = ({ styleContainer, title, iconLucide }: Props) => {
   const colorScheme = useColorScheme();
   const Icon = iconLucide;
   return (
      <View style={styleContainer}>
         <View
            style={{
               // backgroundColor: "red",
               display: "flex",
               flexDirection: "column",
               justifyContent: "center",
               alignItems: "center",
               gap: 10,
            }}
         >
            <Icon
               size={40}
               color={Colors[colorScheme ?? "light"].optionButtonIcon}
               strokeWidth={2}
            />
            <Text
               style={{
                  fontSize: 20,
                  lineHeight: 22,
                  fontFamily: "Poppins600",
                  color: Colors[colorScheme ?? "light"].text,
               }}
            >
               {title}
            </Text>
         </View>
      </View>
   );
};

export default ViewIconItem;
