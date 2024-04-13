import { View, StyleProp, ViewStyle } from "react-native";
import React from "react";
import ButtonSquareIconText from "./ButtonSquareIconText";
import {
   EllipsisVertical,
   ExternalLink,
   UserRoundPlus,
} from "lucide-react-native";

interface Props {
   styleContainer?: StyleProp<ViewStyle>;
   functionMoreBtn: () => void;
}

const ViewOptionsGroup = ({ styleContainer, functionMoreBtn }: Props) => {
   return (
      <View
         style={[
            {
               display: "flex",

               flexDirection: "row",
               justifyContent: "space-evenly",
               gap: 10,
            },
            styleContainer,
         ]}
      >
         <ButtonSquareIconText
            onPress={() => {}}
            description="Visitar"
            iconLucide={ExternalLink}
         />
         <ButtonSquareIconText
            onPress={() => {}}
            description="Agregar"
            iconLucide={UserRoundPlus}
         />
         <ButtonSquareIconText
            onPress={functionMoreBtn}
            description="Más"
            iconLucide={EllipsisVertical}
         />
      </View>
   );
};

export default ViewOptionsGroup;
