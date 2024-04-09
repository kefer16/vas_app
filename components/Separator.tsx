import Colors from "@/constants/Colors";
import React from "react";
import { View, useColorScheme } from "react-native";

const Separator = () => {
   const colorScheme = useColorScheme();
   return (
      <View
         style={{
            width: "100%",
            height: 1,
            backgroundColor: Colors[colorScheme ?? "light"].separatorBackground,
         }}
      />
   );
};

export default Separator;
