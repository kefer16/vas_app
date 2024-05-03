import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
   return (
      <Stack>
         <Stack.Screen name="edit" options={{ headerShown: false }} />
         <Stack.Screen name="view" options={{ headerShown: false }} />
      </Stack>
   );
};

export default _layout;
