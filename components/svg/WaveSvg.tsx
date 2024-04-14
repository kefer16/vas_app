import Colors from "@/constants/Colors";
import React from "react";
import { StyleProp, ViewStyle, useColorScheme } from "react-native";
import { NumberProp, Path, Svg } from "react-native-svg";

interface Props {
   styleContainer: StyleProp<ViewStyle>;
   height?: NumberProp;
}
const WaveSvg = ({ styleContainer, height }: Props) => {
   const colorScheme = useColorScheme();
   return (
      <Svg
         style={styleContainer}
         viewBox="0 0 500 150"
         preserveAspectRatio="none"
         width={"100%"}
         // style="height: 100%; width: 100%;"
         height={height}
      >
         <Path
            d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            stroke="none"
            fill={Colors[colorScheme ?? "light"].svgContainer}
         ></Path>
      </Svg>
   );
};

export default WaveSvg;
