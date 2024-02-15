import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Href } from "expo-router/build/link/href";
import Constants from "expo-constants";
interface Props {
   title: string;
   urlBack?: Href;
   isSecondaryPage: boolean;
}

const HeaderCustom = ({ title, urlBack, isSecondaryPage }: Props) => {
   return (
      <View
         style={{
            paddingTop: Constants.statusBarHeight,
            width: "100%",
            height: 70,
            display: "flex",
            flexDirection: "row",
            alignSelf: "flex-end",
            // backgroundColor: "red",
            paddingHorizontal: 10,
            alignItems: "center",
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
               fontSize: 15,
               color: "#fff",
               fontFamily: "Poppins600",
            }}
         >
            {title}
         </Text>
      </View>
   );
};

export default HeaderCustom;
