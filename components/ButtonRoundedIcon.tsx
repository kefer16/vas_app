import { TouchableOpacity, useColorScheme } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { LucideIcon } from "lucide-react-native";

interface Props {
   onPress: () => void;
   iconLucide: LucideIcon;
}

const ButtonIcon = ({ onPress, iconLucide }: Props) => {
   const colorScheme = useColorScheme();
   const Icon = iconLucide;
   return (
      <TouchableOpacity
         style={{
            backgroundColor:
               Colors[colorScheme ?? "light"].buttonIconBackground,
            padding: 10,
            borderRadius: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
         }}
         onPress={onPress}
      >
         <Icon
            size={20}
            color={Colors[colorScheme ?? "light"].buttonIconColor}
            strokeWidth={2}
         />
      </TouchableOpacity>
   );
};

export default ButtonIcon;
