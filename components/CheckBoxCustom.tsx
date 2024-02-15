import { View, Text, useColorScheme } from "react-native";
import Checkbox from "expo-checkbox";
import Colors from "@/constants/Colors";
import { Dispatch, SetStateAction } from "react";

interface CheckBoxProps {
   label: string;
   value: boolean;
   setValue: Dispatch<SetStateAction<boolean>>;
}

const CheckBoxCustom = ({ label, value, setValue }: CheckBoxProps) => {
   const colorScheme = useColorScheme();
   // const [isChecked, setIsCheked] = useState<boolean>(false);

   return (
      <View
         style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
         }}
      >
         <Checkbox
            style={{
               borderRadius: 5,
            }}
            color={Colors[colorScheme ?? "light"].buttonContainer}
            value={value}
            onValueChange={setValue}
         />
         <Text
            style={{
               marginLeft: 5,
               color: Colors[colorScheme ?? "light"].text,
               fontSize: 12,
               fontFamily: "Poppins400",
            }}
         >
            {label}
         </Text>
      </View>
   );
};

export default CheckBoxCustom;
