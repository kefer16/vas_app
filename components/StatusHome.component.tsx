import { View, Text, useColorScheme, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
interface Props {
   styleProps: StyleProp<ViewStyle>;
}

const StatusHomeComponent = ({ styleProps }: Props) => {
   const colorScheme = useColorScheme();
   return (
      <View
         style={[
            {
               width: "100%",
               display: "flex",
               flexDirection: "row",
               justifyContent: "space-between",
               gap: 10,
            },
            styleProps,
         ]}
      >
         <View
            style={{
               width: "30%",
               backgroundColor: Colors[colorScheme ?? "light"].card,
               borderRadius: 10,
               padding: 10,
            }}
         >
            <View
               style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  marginBottom: 10,
               }}
            >
               <View
                  style={{
                     padding: 10,
                     justifyContent: "center",
                     alignItems: "center",
                     borderRadius: 30,
                     backgroundColor: "rgba(0, 188, 212, 0.2)",
                  }}
               >
                  <Ionicons
                     style={{
                        color: "rgb(0, 188, 212)",
                     }}
                     name="document-outline"
                     size={16}
                  />
               </View>

               <Text
                  style={{
                     color: Colors[colorScheme ?? "light"].text,
                     fontFamily: "Poppins800",
                     fontSize: 25,
                     lineHeight: 28,
                     marginLeft: 10,
                  }}
               >
                  10
               </Text>
            </View>

            <Text
               style={{
                  color: Colors[colorScheme ?? "light"].text,
                  fontFamily: "Poppins300",
               }}
            >
               Totales
            </Text>
         </View>
         <View
            style={{
               width: "30%",
               backgroundColor: Colors[colorScheme ?? "light"].card,
               borderRadius: 10,
               padding: 10,
            }}
         >
            <View
               style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  marginBottom: 10,
               }}
            >
               <View
                  style={{
                     padding: 10,
                     justifyContent: "center",
                     alignItems: "center",
                     borderRadius: 30,
                     backgroundColor: "rgba(255, 152, 0, 0.2)",
                  }}
               >
                  <Ionicons
                     style={{
                        color: "rgb(255, 152, 0)",
                     }}
                     name="hourglass-outline"
                     size={16}
                  />
               </View>

               <Text
                  style={{
                     color: Colors[colorScheme ?? "light"].text,
                     fontFamily: "Poppins800",
                     fontSize: 25,
                     lineHeight: 28,
                     marginLeft: 10,
                  }}
               >
                  7
               </Text>
            </View>

            <Text
               style={{
                  color: Colors[colorScheme ?? "light"].text,
                  fontFamily: "Poppins300",
               }}
            >
               En Progreso
            </Text>
         </View>
         <View
            style={{
               width: "30%",
               backgroundColor: Colors[colorScheme ?? "light"].card,
               borderRadius: 10,
               padding: 10,
            }}
         >
            <View
               style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  marginBottom: 10,
               }}
            >
               <View
                  style={{
                     padding: 10,
                     justifyContent: "center",
                     alignItems: "center",
                     borderRadius: 30,
                     backgroundColor: "rgba(244, 67, 54, 0.2)",
                  }}
               >
                  <Ionicons
                     style={{
                        color: "rgb(244, 67, 54)",
                     }}
                     name="close-outline"
                     size={16}
                  />
               </View>

               <Text
                  style={{
                     color: Colors[colorScheme ?? "light"].text,
                     fontFamily: "Poppins800",
                     fontSize: 25,
                     lineHeight: 28,
                     marginLeft: 10,
                  }}
               >
                  3
               </Text>
            </View>

            <Text
               style={{
                  color: Colors[colorScheme ?? "light"].text,
                  fontFamily: "Poppins300",
               }}
            >
               Canceladas
            </Text>
         </View>
      </View>
   );
};

export default StatusHomeComponent;
