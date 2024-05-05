import {
   View,
   Text,
   StyleProp,
   ViewStyle,
   Image,
   useColorScheme,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

interface Props {
   styleContainer?: StyleProp<ViewStyle>;
   userName: string;
}

const Welcome = ({ styleContainer, userName }: Props) => {
   const colorScheme = useColorScheme();
   return (
      <View
         style={[
            {
               display: "flex",
               flexDirection: "row",
               justifyContent: "space-between",
               alignItems: "center",
               height: 50,
            },
            styleContainer,
         ]}
      >
         <Text
            style={{
               fontFamily: "Poppins700",
               fontSize: 20,
            }}
         >
            {`Hola, `}
            <Text
               style={{
                  color: Colors[colorScheme ?? "light"].textLink,
               }}
            >
               {`${userName} `}
            </Text>
            👋
         </Text>
         <View>
            <Image
               style={{ width: 40, height: 40, borderRadius: 50 }}
               source={{
                  uri: "https://avatars.githubusercontent.com/u/66371768?s=400&u=ed993189f85a13ed1c19cce1129ecb3501b065cd&v=4",
               }}
            />
         </View>
      </View>
   );
};

export default Welcome;
