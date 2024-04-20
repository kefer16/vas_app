import React from "react";
import { Stack } from "expo-router";
import { ModuleProvider } from "@/contexts/Module.context";

const _layout = () => {
   return (
      <ModuleProvider>
         <Stack initialRouteName="index">
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="view" options={{ headerShown: false }} />
            <Stack.Screen name="edit" options={{ headerShown: false }} />
         </Stack>
      </ModuleProvider>
   );
};

export default _layout;
