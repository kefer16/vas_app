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
   text: string;
   onPress: () => void;
   styleButton?: StyleProp<ViewStyle>;
   isEnabled?: boolean;
}
const ButtonIconText = ({
   styleButton,
   text,
   onPress,
   isEnabled = true,
}: Props) => {
   const colorScheme = useColorScheme();
   return (
      <TouchableOpacity
         style={{
            backgroundColor: Colors[colorScheme ?? "light"].buttonContainer,
            borderRadius: 10,
         }}
         onPress={() => {
            isEnabled && onPress();
         }}
      >
         <View
            style={[
               {
                  width: "100%",
                  height: 60,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
               },
               !isEnabled && {
                  opacity: 0.6,
               },
            ]}
         >
            <Plus
               style={{ marginRight: 10 }}
               color={"#fff"}
               size={20}
               strokeWidth={3}
            />
            <Text
               style={{
                  color: Colors[colorScheme ?? "light"].buttonText,
                  fontSize: 14,
                  fontFamily: "Poppins600",
               }}
            >
               {text}
            </Text>
         </View>
      </TouchableOpacity>
   );
};

export default ButtonIconText;
