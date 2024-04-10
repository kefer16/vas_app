import Colors from "@/constants/Colors";
import React from "react";
import { View, useColorScheme } from "react-native";

const Separator = () => {
   const colorScheme = useColorScheme();
   return (
      <View
         style={{
            // flex: 1,
            width: "100%",
            // height: 1,
            maxHeight: 0.5,
            borderBottomWidth: 0.5,
            borderBottomColor:
               Colors[colorScheme ?? "light"].separatorBackground,
         }}
      />
   );
};

export default Separator;
