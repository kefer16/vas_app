import {
   View,
   KeyboardTypeOptions,
   useColorScheme,
   TextInput,
   TouchableOpacity,
   ViewStyle,
   StyleProp,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import Colors from "../constants/Colors";
import { Search } from "lucide-react-native";
interface Props {
   containerStyle?: StyleProp<ViewStyle>;
   placeholder: string;
   value: string;
   keyboardType: KeyboardTypeOptions;
   functionChangeText: Dispatch<SetStateAction<string>>;
   funButtonSearch: () => void;
   maxLength?: number;
   inputIsRequired?: boolean;
   inputIsEditable?: boolean;
}
const InputTextSearchCustom = ({
   containerStyle,
   placeholder,
   value,
   functionChangeText,
   funButtonSearch,
   keyboardType,
   maxLength,
   inputIsEditable = true,
}: Props) => {
   const colorScheme = useColorScheme();
   const [focus, setfocus] = useState<boolean>(false);
   const onFocus = () => {
      setfocus(true);
   };
   const onBlur = () => {
      setfocus(false);
   };

   return (
      <View
         style={[
            {
               display: "flex",
               alignItems: "center",
               // backgroundColor: "red",
            },
            containerStyle,
         ]}
      >
         <TextInput
            autoComplete="off"
            editable={inputIsEditable}
            placeholderTextColor={
               Colors[colorScheme ?? "light"].InputTextPlaceHolder
            }
            style={[
               {
                  width: "100%",
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  fontSize: 15,
                  // lineHeight: 17,
                  color: Colors[colorScheme ?? "light"].inputText,
                  fontFamily: "Poppins300",
                  paddingHorizontal: 20,
                  borderRadius: 50,
                  backgroundColor:
                     Colors[colorScheme ?? "light"].inputContainer,
               },
               focus && {
                  borderColor: "#007bff",
               },
               !inputIsEditable && {
                  opacity: 0.5,
                  backgroundColor:
                     colorScheme === "light" ? "#00000020" : "#ffffff40",
               },
            ]}
            value={value}
            placeholder={placeholder}
            onChangeText={functionChangeText}
            onFocus={onFocus}
            onSubmitEditing={funButtonSearch}
            onBlur={onBlur}
            keyboardType={keyboardType}
            maxLength={maxLength}
         />

         <View
            style={{
               position: "absolute",
               width: 50,
               height: 50,
               bottom: 0,
               right: 10,
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               zIndex: 2,
               backgroundColor: Colors[colorScheme ?? "light"].inputContainer,
               borderRadius: 50,
            }}
         >
            <TouchableOpacity
               style={{
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
               }}
               onPress={() => {
                  inputIsEditable && funButtonSearch();
               }}
            >
               <Search
                  size={20}
                  color={Colors[colorScheme ?? "light"].buttonIconColor}
                  strokeWidth={2}
               />
            </TouchableOpacity>
         </View>
      </View>
   );
};

export default InputTextSearchCustom;
