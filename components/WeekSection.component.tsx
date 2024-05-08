import {
   ScrollView,
   StyleProp,
   Text,
   View,
   ViewStyle,
   useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { WeekDaysProps, getDaysWeek } from "@/utils/functions";
interface Props {
   styleProps?: StyleProp<ViewStyle>;
   currentDay: number;
}
const WeekSectionComponent = ({ styleProps, currentDay }: Props) => {
   const colorScheme = useColorScheme();
   const [daysWeek, setDaysWeek] = useState<WeekDaysProps[]>([]);
   useEffect(() => {
      setDaysWeek(getDaysWeek());
   }, []);

   return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
         <View
            style={[
               {
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  // overflow: "scroll",
               },
               styleProps,
            ]}
         >
            {daysWeek.map((item: WeekDaysProps) => {
               return (
                  <View
                     key={String(item.number)}
                     style={[
                        {
                           width: 70,

                           borderRadius: 10,
                           padding: 10,
                        },
                        item.number === currentDay
                           ? { backgroundColor: "#fdd9d7" }
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
                           fontSize: 15,
                           lineHeight: 28,
                           textAlign: "center",
                        }}
                     >
                        {item.name}
                     </Text>
                     <Text
                        style={{
                           color: Colors[colorScheme ?? "light"].text,
                           fontFamily: "Poppins700",
                           fontSize: 20,
                           textAlign: "center",
                        }}
                     >
                        {item.number.toString().padStart(2, "0")}
                     </Text>
                  </View>
               );
            })}
         </View>
      </ScrollView>
   );
};

export default WeekSectionComponent;
