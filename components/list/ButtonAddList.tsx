import {
   View,
   Text,
   useColorScheme,
   TouchableOpacity,
   StyleProp,
   ViewStyle,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Plus } from "lucide-react-native";

interface Props {
   onPress: () => void;
   styleButton?: StyleProp<ViewStyle>;
}
const ButtonAddList = ({ styleButton, onPress }: Props) => {
   const colorScheme = useColorScheme();
   return (
      <View
         style={{
            position: "absolute",
            zIndex: 9,
            bottom: 20,
            right: 20,
            backgroundColor: "transparent",
         }}
      >
         <TouchableOpacity
            style={{
               backgroundColor: Colors[colorScheme ?? "light"].buttonContainer,
               borderRadius: 50,
               width: 50,
               height: 50,
               display: "flex",
               flexDirection: "row",
               justifyContent: "center",
               alignItems: "center",
            }}
            onPress={() => {
               onPress();
            }}
         >
            <Plus color={"#fff"} size={20} strokeWidth={3} />
         </TouchableOpacity>
      </View>
   );
};

export default ButtonAddList;
