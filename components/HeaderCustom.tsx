import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
interface Props {
   title: string;
   isSecondaryPage: boolean;
}

const HeaderCustom = ({ title, isSecondaryPage }: Props) => {
   const colorScheme = useColorScheme();
   const funBack = () => {
      router.back();
   };
   return (
      <View
         style={{
            width: "100%",
            display: "flex",
            backgroundColor: "#8673FF",
         }}
      >
         <View
            style={{
               width: "100%",
               height: 60,
               display: "flex",
               flexDirection: "row",
               alignSelf: "flex-end",
               backgroundColor: Colors[colorScheme ?? "light"].containerHeader,
               paddingHorizontal: 10,
               alignItems: "center",
               elevation: 5,
            }}
         >
            {isSecondaryPage && (
               <TouchableOpacity
                  style={{
                     position: "absolute",
                     zIndex: 9,
                     top: 15,
                     left: 10,
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     width: 30,
                     height: 30,
                     borderRadius: 50,
                     backgroundColor: "#0000003f",
                     marginRight: 20,
                  }}
                  onPress={funBack}
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
                  width: "100%",
                  fontSize: 16,
                  color: "#fff",
                  fontFamily: "Poppins500",
                  textAlign: "center",
                  // backgroundColor: "red",
               }}
            >
               {title}
            </Text>
         </View>
      </View>
   );
};

export default HeaderCustom;
