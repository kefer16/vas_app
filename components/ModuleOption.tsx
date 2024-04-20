import {
   View,
   Text,
   TouchableOpacity,
   useColorScheme,
   StyleProp,
   TextStyle,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { ChevronRight, Package } from "lucide-react-native";
interface Props {
   styleTouchable?: StyleProp<TextStyle>;
   textTitle: string;
   textDescription: string;
   onPress?: () => void;
}
const ModuleOption = ({
   styleTouchable,
   textTitle,
   textDescription,
   onPress,
}: Props) => {
   const colorScheme = useColorScheme();
   return (
      <TouchableOpacity
         style={[
            styleTouchable,
            {
               padding: 15,
               display: "flex",
               flexDirection: "row",
               alignItems: "center",
               backgroundColor: Colors[colorScheme ?? "light"].card,
               borderRadius: 10,
               overflow: "hidden",
            },
         ]}
         onPress={onPress}
      >
         <Package
            style={{
               marginRight: 10,
            }}
            color={Colors[colorScheme ?? "light"].optionButtonIcon}
            size={25}
            strokeWidth={2}
         />
         <View>
            <Text
               style={{
                  fontSize: 15,
                  fontFamily: "Poppins600",
                  lineHeight: 20,
                  color: Colors[colorScheme ?? "light"].textTitle,
               }}
            >
               {textTitle}
            </Text>
            <Text
               style={{
                  fontSize: 11,
                  fontFamily: "Poppins300",
                  color: Colors[colorScheme ?? "light"].textSubtitle,
               }}
            >
               {textDescription.length >= 40
                  ? `${textDescription.substring(0, 40)} ...`
                  : textDescription}
            </Text>
         </View>

         <ChevronRight
            style={{
               marginLeft: "auto",
            }}
            color={Colors[colorScheme ?? "light"].iconSecondary}
            size={20}
         />
      </TouchableOpacity>
   );
};

export default ModuleOption;
