import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
   return (
      <Stack initialRouteName="index">
         {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
         <Stack.Screen name="edit" options={{ headerShown: false }} />
         <Stack.Screen name="view" options={{ headerShown: false }} />
      </Stack>
   );
};

export default _layout;
