import { View, useColorScheme } from "react-native";
import React from "react";
import Constants from "expo-constants";
import Colors from "@/constants/Colors";

const BarHeightCustom = () => {
   const colorScheme = useColorScheme();
   return (
      <View
         style={{
            width: "100%",
            height: Constants.statusBarHeight,
            backgroundColor: Colors[colorScheme ?? "light"].container,
         }}
      />
   );
};

export default BarHeightCustom;
