import {
   View,
   KeyboardTypeOptions,
   useColorScheme,
   TextInput,
   TouchableOpacity,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import Colors from "../constants/Colors";
import { Search } from "lucide-react-native";
interface Props {
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
         style={{
            display: "flex",
            alignItems: "center",
            // backgroundColor: "red",
         }}
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
               height: 50,
               bottom: 0,
               right: 20,
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               zIndex: 1,
               // backgroundColor: "red",
            }}
         >
            <TouchableOpacity
               style={{
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // backgroundColor: "green",
               }}
               onPress={() => {
                  inputIsEditable && funButtonSearch();
               }}
            >
               <Search color={"#fff"} size={20} />
            </TouchableOpacity>
         </View>
      </View>
   );
};

export default InputTextSearchCustom;
