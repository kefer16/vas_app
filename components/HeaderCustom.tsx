import { View, Text, useColorScheme, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Href } from "expo-router/build/link/href";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
interface Props {
   title: string;
   urlBack?: Href;
   isSecondaryPage: boolean;
}

const HeaderCustom = ({ title, urlBack, isSecondaryPage }: Props) => {
   const colorScheme = useColorScheme();

   return (
      <View
         style={{
            paddingTop: Constants.statusBarHeight,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignSelf: "flex-end",
            // backgroundColor: Colors[colorScheme ?? "light"].containerHeader,
            paddingHorizontal: 10,
            paddingVertical: 10,
            paddingTop: Constants.statusBarHeight,
         }}
      >
         {isSecondaryPage && (
            <TouchableOpacity
               style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  backgroundColor: "#0000003f",
                  marginRight: 20,
               }}
               onPress={() => router.replace(urlBack ?? "..")}
            >
               <Ionicons
                  style={{
                     fontSize: 20,
                     color: "#fff",
                  }}
                  name={"arrow-back-outline"}
               />
            </TouchableOpacity>
         )}

         <Text
            style={{
               fontSize: 20,
               color: "#fff",
               fontFamily: "Poppins700",
            }}
         >
            {title}
         </Text>
      </View>
   );
};

export default HeaderCustom;
