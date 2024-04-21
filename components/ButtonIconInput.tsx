import { Dispatch, SetStateAction, useState } from "react";
import {
   View,
   Text,
   StyleProp,
   ViewStyle,
   useColorScheme,
   TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import { Building2, ChevronRight } from "lucide-react-native";

interface Props {
   onPress: () => void;
   title: string;
   placeholder?: string;
   value: string;
   styleContainer?: StyleProp<ViewStyle>;
   maxLength?: number;
   inputIsRequired?: boolean;
   inputIsEditable?: boolean;
}
const ButtonIconInput = ({
   onPress,
   title,
   placeholder = "",
   value,
   styleContainer,
   maxLength,
   inputIsRequired = false,
}: Props) => {
   const colorScheme = useColorScheme();
   const [focus, setfocus] = useState<boolean>(false);

   return (
      <TouchableOpacity onPress={onPress}>
         <Text
            style={[
               {
                  display: "flex",
                  width: "100%",
                  height: 60,
                  fontSize: 14,
                  color: Colors[colorScheme ?? "light"].inputText,
                  fontFamily: "Poppins300",
                  paddingTop: 25,
                  // paddingBottom: 10,
                  paddingLeft: 45,
                  // paddingRight: 50,
                  borderRadius: 10,
                  backgroundColor:
                     Colors[colorScheme ?? "light"].inputContainer,
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: Colors[colorScheme ?? "light"].inputBorder,
               },
               focus && {
                  borderColor: "#007bff",
               },
            ]}
         >
            {value}
         </Text>
         <View
            style={{
               position: "absolute",
               top: 10,
               left: 10,
               zIndex: 1,
               flexDirection: "row",
            }}
         >
            <Text
               style={[
                  {
                     fontSize: 10,
                     lineHeight: 12,
                     textAlign: "left",
                     color: Colors[colorScheme ?? "light"].inputTitle,
                     fontFamily: "Poppins600",
                  },
                  focus && {
                     color: "#007bff",
                  },
               ]}
            >
               {title}
            </Text>
            {inputIsRequired && (
               <Text
                  style={[
                     {
                        fontSize: 10,
                        lineHeight: 12,
                        color: "#f44336",
                     },
                     focus && {
                        color: "#007bff",
                     },
                  ]}
               >
                  {` *`}{" "}
               </Text>
            )}
         </View>

         <View
            style={{
               position: "absolute",
               top: 20,
               left: 10,
               zIndex: 1,
               width: 30,
               height: 30,
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               // backgroundColor: "red",
            }}
         >
            <Building2
               color={Colors[colorScheme ?? "light"].optionButtonIcon}
               size={20}
            />
         </View>
         <View
            style={{
               position: "absolute",
               top: 15,
               right: 10,
               zIndex: 1,
               width: 30,
               height: 30,
               display: "flex",
               alignItems: "flex-end",
               justifyContent: "center",
            }}
         >
            <ChevronRight
               color={Colors[colorScheme ?? "light"].iconSecondary}
               size={20}
            />
         </View>
      </TouchableOpacity>
   );
};
export default ButtonIconInput;
