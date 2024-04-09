import {
   View,
   Text,
   StyleProp,
   TextStyle,
   useColorScheme,
   TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { EllipsisVertical, Undo2 } from "lucide-react-native";
import { useNavigation } from "expo-router";
interface Props {
   textStyle?: StyleProp<TextStyle>;
   text: string;
}
const TitleList = ({ textStyle, text }: Props) => {
   const navigate = useNavigation();
   const colorScheme = useColorScheme();
   const btnReturn = () => {
      navigate.goBack();
   };
   return (
      <View
         style={{
            display: "flex",
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // backgroundColor: "red",
         }}
      >
         <TouchableOpacity
            style={{
               backgroundColor: Colors[colorScheme ?? "light"].card,
               padding: 10,
               borderRadius: 50,
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
            }}
            onPress={btnReturn}
         >
            <Undo2 size={20} color={"#fff"} />
         </TouchableOpacity>
         <Text
            style={[
               {
                  fontSize: 20,
                  lineHeight: 26,
                  color: Colors[colorScheme ?? "light"].textTitle,
                  fontFamily: "Poppins700",
               },
               textStyle,
            ]}
         >
            {text}
         </Text>
         <TouchableOpacity
            style={{
               backgroundColor: Colors[colorScheme ?? "light"].card,
               padding: 10,
               borderRadius: 50,
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
            }}
         >
            <EllipsisVertical size={20} color={"#fff"} />
         </TouchableOpacity>
      </View>
   );
};

export default TitleList;
