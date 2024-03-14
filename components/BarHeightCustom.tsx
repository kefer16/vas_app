import { View } from "react-native";
import React from "react";
import Constants from "expo-constants";

const BarHeightCustom = () => {
   return (
      <View
         style={{
            width: "100%",
            height: Constants.statusBarHeight,
         }}
      />
   );
};

export default BarHeightCustom;
