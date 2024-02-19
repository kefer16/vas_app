import {
   View,
   useColorScheme,
   StyleProp,
   TextStyle,
   TextInput,
   ViewStyle,
} from "react-native";
import React, {
   Dispatch,
   MutableRefObject,
   SetStateAction,
   useRef,
   useState,
} from "react";
import Colors from "@/constants/Colors";

interface Props {
   refs: MutableRefObject<TextInput[]>;
   position: number;
   value: string;
   functionChangeText: (numberPosition: number, value: string) => void;
   styleInput?: StyleProp<TextStyle>;
}
interface PositionProps {
   position: number;
   value: string;
}

const InputCode = ({
   refs,
   position,
   value,
   functionChangeText,
   styleInput,
}: Props) => {
   const colorScheme = useColorScheme();
   const [focus, setfocus] = useState<boolean>(false);
   const [code, setCode] = useState<string>("");
   const onFocus = () => {
      setfocus(true);
   };
   const onBlur = () => {
      setfocus(false);
   };
   const changeCode = (position: number, value: string) => {
      setCode(value);
      functionChangeText(position, value);
   };

   return (
      <TextInput
         ref={(ref) => (refs.current[position] = ref as TextInput)}
         placeholderTextColor={
            Colors[colorScheme ?? "light"].InputTextPlaceHolder
         }
         style={[
            {
               display: "flex",
               width: "15%",
               fontSize: 15,
               color: Colors[colorScheme ?? "light"].inputText,
               fontFamily: "Poppins300",
               paddingVertical: 5,
               paddingHorizontal: 10,
               borderRadius: 5,
               borderStyle: "solid",
               borderWidth: 1,
               borderColor: Colors[colorScheme ?? "light"].inputBorder,
               textAlign: "center",
            },
            focus && {
               borderColor: "#007bff",
            },
            styleInput,
         ]}
         value={code}
         onChangeText={(value) => changeCode(position, value)}
         onFocus={onFocus}
         onBlur={onBlur}
         keyboardType="number-pad"
         maxLength={1}
      />
   );
};
interface InputCodeCustomProps {
   // value : string;
   style?: StyleProp<ViewStyle>;
   valueChange: Dispatch<SetStateAction<string>>;
}

const InputCodeCustom = ({ style, valueChange }: InputCodeCustomProps) => {
   const [position, setPosition] = useState<PositionProps[]>([
      { position: 0, value: "" },
      { position: 1, value: "" },
      { position: 2, value: "" },
      { position: 3, value: "" },
      { position: 4, value: "" },
      { position: 5, value: "" },
   ]);
   const inputRefs = useRef<TextInput[]>([]);

   const changeValue = (numberPosition: number, value: string) => {
      const arrayValue = position;
      arrayValue[numberPosition].value = value;
      const numbersConcat: string = arrayValue
         .map((item) => item.value)
         .join("");
      setPosition(arrayValue);
      valueChange(numbersConcat);
      if (numberPosition < inputRefs.current.length - 1 && value.length > 0) {
         inputRefs.current[numberPosition + 1].focus();
      }
      if (numberPosition > 0 && value.length <= 0) {
         inputRefs.current[numberPosition - 1].focus();
      }
   };

   return (
      <View
         style={[
            {
               display: "flex",
               alignItems: "center",
            },
            style,
         ]}
      >
         <View
            style={{
               display: "flex",
               width: "90%",
               flexDirection: "row",
               justifyContent: "space-around",
            }}
         >
            {position.map((item) => {
               return (
                  <InputCode
                     key={String(item.position)}
                     refs={inputRefs}
                     position={item.position}
                     value={item.value}
                     functionChangeText={changeValue}
                  />
               );
            })}
         </View>
      </View>
   );
};

export default InputCodeCustom;
