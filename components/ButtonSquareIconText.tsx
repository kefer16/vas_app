import { Text, TouchableOpacity, useColorScheme } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { LucideIcon } from "lucide-react-native";

interface Props {
   onPress: () => void;
   description: string;
   iconLucide: LucideIcon;
}

const ButtonSquareIconText = ({ onPress, description, iconLucide }: Props) => {
   const colorScheme = useColorScheme();
   const Icon = iconLucide;
   return (
      <TouchableOpacity
         style={{
            backgroundColor:
               Colors[colorScheme ?? "light"].buttonIconBackground,
            width: "auto",
            minWidth: "30%",
            padding: 10,
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
         }}
         onPress={onPress}
      >
         <Icon
            size={20}
            color={Colors[colorScheme ?? "light"].buttonIconColor}
            strokeWidth={2}
         />
         <Text
            style={{
               color: Colors[colorScheme ?? "light"].buttonIconColor,
               fontSize: 13,
               fontFamily: "Poppins400",
            }}
         >
            {description}
         </Text>
      </TouchableOpacity>
   );
};

export default ButtonSquareIconText;
