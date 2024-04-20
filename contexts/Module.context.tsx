import React, { createContext, useState } from "react";
import { DtoModulesRes } from "@/apis/modules/dto/responses/modules.dto";

interface ContextProps {
   sesionModules: DtoModulesRes[];
   saveSesionModules: (pItems: DtoModulesRes[]) => void;
}

export const ModuleContext = createContext<ContextProps>({} as ContextProps);

export const ModuleProvider = ({ children }: any) => {
   const [sesionModules, setModulesSesion] = useState<DtoModulesRes[]>([]);

   const saveSesionModules = async (pItems: DtoModulesRes[]) => {
      const array = pItems.sort((a, b) => {
         return (
            new Date(b.CreationDate).getTime() -
            new Date(a.CreationDate).getTime()
         );
      });
      setModulesSesion([...array]);
   };

   return (
      <ModuleContext.Provider
         value={{
            sesionModules,
            saveSesionModules,
         }}
      >
         {children}
      </ModuleContext.Provider>
   );
};
