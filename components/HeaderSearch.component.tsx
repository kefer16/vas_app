import {
   StyleProp,
   TextInput,
   TouchableOpacity,
   View,
   ViewStyle,
   useColorScheme,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface Props {
   styleContainer?: StyleProp<ViewStyle>;
   placeholder: string;
   value: string;
   functionChangeText: Dispatch<SetStateAction<string>>;
   funButtonSearch: () => void;
   maxLength?: number;
}

const HeaderSearchComponent = ({
   styleContainer,
   placeholder,
   value,
   functionChangeText,
   funButtonSearch,
   maxLength,
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
      <View style={[{ position: "relative" }, styleContainer]}>
         <TextInput
            placeholderTextColor={
               Colors[colorScheme ?? "light"].InputTextPlaceHolder
            }
            style={[
               {
                  display: "flex",
                  width: "100%",
                  fontSize: 15,
                  lineHeight: 17,
                  color: Colors[colorScheme ?? "light"].inputText,
                  fontFamily: "Poppins300",
                  paddingVertical: 10,
                  paddingLeft: 50,
                  borderRadius: 20,
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
            value={value}
            placeholder={placeholder}
            onChangeText={functionChangeText}
            onFocus={onFocus}
            onSubmitEditing={funButtonSearch}
            onBlur={onBlur}
            keyboardType={"default"}
            maxLength={maxLength}
         />
         <View
            style={{
               flexDirection: "row",
               position: "absolute",
               top: 18,
               left: 20,
               zIndex: 1,
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
                  funButtonSearch();
               }}
            >
               <Ionicons
                  style={{ color: Colors[colorScheme ?? "light"].inputTitle }}
                  name={"search"}
                  size={20}
               />
            </TouchableOpacity>
         </View>
      </View>
   );
};

export default HeaderSearchComponent;
