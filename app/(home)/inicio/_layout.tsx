import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
   return (
      <Stack>
         <Stack.Screen name="index" options={{ headerShown: false }} />
         <Stack.Screen name="company" options={{ headerShown: false }} />
         <Stack.Screen name="module" options={{ headerShown: false }} />
      </Stack>
   );
};

export default _layout;
