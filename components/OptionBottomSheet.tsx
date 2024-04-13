import { StyleProp, Text, ViewStyle, useColorScheme } from "react-native";
import React from "react";
import { Trash } from "lucide-react-native";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
   styleContainer?: StyleProp<ViewStyle>;
   onPress: () => void;
}

const OptionBottomSheet = ({ styleContainer, onPress }: Props) => {
   const colorScheme = useColorScheme();
   return (
      <TouchableOpacity
         style={[
            {
               display: "flex",
               height: 40,
               flexDirection: "row",
               paddingHorizontal: 10,
               // justifyContent: "center",
               alignItems: "center",
               backgroundColor: "rgba( 0, 0, 0, 0.1)",
            },
            styleContainer,
         ]}
         onPress={onPress}
      >
         <Trash
            style={{
               marginRight: 10,
            }}
            size={20}
            color={Colors[colorScheme ?? "light"].buttonIconColor}
         />
         <Text
            style={{
               height: 20,
               fontSize: 15,
               textAlign: "left",
               fontFamily: "Poppins400",
            }}
         >
            Eliminar
         </Text>
      </TouchableOpacity>
   );
};

export default OptionBottomSheet;
