import { View, Text, useColorScheme, TouchableOpacity } from "react-native";
import React from "react";
import ContainerCustom from "@/components/ContainerCustom";
import Colors from "@/constants/Colors";
import {
   WeekDaysProps,
   getDaysMonth,
   getMonth,
   getYear,
} from "@/utils/functions";
import ListHeader from "@/components/list/ListHeader";

interface Props {
   daysMonth: WeekDaysProps[];
}
const index = ({ daysMonth = getDaysMonth() }: Props) => {
   const colorScheme = useColorScheme();
   return (
      <ContainerCustom>
         <ListHeader
            containerStyle={{ paddingHorizontal: 10 }}
            text="Calendario"
         />
         <View
            style={{
               paddingVertical: 10,
               display: "flex",
               gap: 10,
            }}
         >
            <Text
               style={{
                  fontFamily: "Poppins700",
                  fontSize: 20,
                  color: Colors[colorScheme ?? "light"].text,
               }}
            >
               {`${getMonth()} ${getYear()}`}
            </Text>

            <View
               style={[
                  {
                     width: "100%",
                     display: "flex",
                     flexDirection: "row",
                     flexWrap: "wrap",
                     gap: 5,
                     // overflow: "scroll",
                  },
               ]}
            >
               {daysMonth.map((item: WeekDaysProps, index) => {
                  return (
                     <TouchableOpacity
                        key={item.name + String(item.number + index)}
                        style={[
                           {
                              width: "auto",
                              minWidth: "13%",

                              borderRadius: 10,
                              padding: 10,
                              height: 100,
                           },
                           item.name === "Dom"
                              ? { backgroundColor: "rgba(255,0,0,0.1)" }
                              : {
                                   backgroundColor:
                                      Colors[colorScheme ?? "light"].card,
                                },
                        ]}
                     >
                        <Text
                           style={{
                              color: Colors[colorScheme ?? "light"].text,
                              fontFamily: "Poppins300",
                              fontSize: 10,
                              lineHeight: 12,
                              textAlign: "center",
                           }}
                        >
                           {item.name}
                        </Text>
                        <Text
                           style={{
                              color: Colors[colorScheme ?? "light"].text,
                              fontFamily: "Poppins700",
                              fontSize: 15,
                              textAlign: "center",
                           }}
                        >
                           {item.number === 0
                              ? ""
                              : item.number.toString().padStart(2, "0")}
                        </Text>
                     </TouchableOpacity>
                  );
               })}
            </View>
         </View>
      </ContainerCustom>
   );
};

export default index;
