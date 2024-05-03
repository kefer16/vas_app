import {
   View,
   Text,
   useColorScheme,
   ScrollView,
   Dimensions,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { VasSesionContext } from "@/contexts/Sesion.context";
import ContainerCustom from "@/components/ContainerCustom";
import EditHeader from "@/components/EditHeader";
import Separator from "@/components/Separator";
import InputText from "@/components/InputText";
import Colors from "@/constants/Colors";
import { currentDateISO } from "@/utils/functions";
import { ModuleService } from "@/apis/modules/module.service";
import { CreateModuleReq } from "@/apis/modules/dto/requests/create-module.dto";
import { ModuleContext } from "@/contexts/Module.context";
import { UpdateModuleReq } from "@/apis/modules/dto/requests/update-module.dto";
import { DtoModulesRes } from "@/apis/modules/dto/responses/modules.dto";
import { DtoLoginAccountRes } from "@/apis/account/dto/responses/login-account-res.dto";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import ButtonIconInput from "@/components/ButtonIconInput";
import ButtonSelectCompany from "@/components/edit/company/ButtonSelectCompany";
import { OptionSelect } from "@/entities/ButtonSelect";
import { CompanyService } from "@/apis/companies/company.service";

const edit = () => {
   const colorScheme = useColorScheme();
   const ScreenHeight = Dimensions.get("window").height;
   const BarHeight = 70;
   const { mostrarNotificacion, activarCarga, vasSesion } =
      useContext(VasSesionContext);
   const { sesionModules, saveSesionModules } = useContext(ModuleContext);

   const { id } = useLocalSearchParams<{ id: string }>();

   const [date, setDate] = useState<string>("");
   const [userName, setUserName] = useState<string>("");
   const [active, setActive] = useState<string>("");

   const [name, setName] = useState<string>("");
   const [fkCompany, setFkCompany] = useState<string>("");
   const [optionFkCompany, setOptionFkCompany] = useState<OptionSelect>(
      new OptionSelect()
   );

   const [arrayOptions, setArrayOptions] = useState<OptionSelect[]>([]);

   const createModuleService = async () => {
      const srvModule = new ModuleService();
      const data: CreateModuleReq = {
         Name: name,
         IsActive: true,
         FkCompanyId: optionFkCompany.value,
         CreationDate: currentDateISO(),
         FkUserId: vasSesion.UserId,
      };
      activarCarga(true);
      await srvModule
         .create(data)
         .then((resp) => {
            const array = sesionModules;
            array.push(resp);

            saveSesionModules([...array]);
            router.back();
         })
         .catch((error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   const updateModuleService = async (pId: string) => {
      const srvModule = new ModuleService();
      const data: UpdateModuleReq = {
         Name: name,
         FkCompanyId: optionFkCompany.value,
         IsActive: true,
      };
      activarCarga(true);
      await srvModule
         .update(pId, data)
         .then((resp) => {
            const array = sesionModules.filter((item) => item.ModuleId !== pId);
            array.push(resp);
            saveSesionModules([...array]);
            router.back();
         })
         .catch((error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   const getModuleService = (pId: string): DtoModulesRes => {
      const data =
         sesionModules.find((item) => item.ModuleId === pId) ??
         new DtoModulesRes();
      return data;
   };

   const optionSelected = (pArray: OptionSelect[], pId: string) => {
      if (pId !== "") {
         const optionsSelected = pArray.filter(
            (item) => item.selected === true
         );
         if (
            optionsSelected.length > 0 &&
            optionsSelected.find((item) => item.value !== pId)
         ) {
            return;
         }
         const indexArray = pArray.findIndex((item) => item.value === pId);
         pArray[indexArray].selected = !pArray[indexArray].selected;
         console.log("asigna array", pArray);
         setOptionFkCompany(pArray[indexArray]);
         setArrayOptions([...pArray]);
      }
   };

   const getCompanyService = async (): Promise<OptionSelect[]> => {
      const srvCompany = new CompanyService();
      let array: OptionSelect[] = [];
      activarCarga(true);
      await srvCompany
         .getAllOptions()
         .then((resp) => {
            array = [...resp];
         })
         .catch((error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
      return array;
   };

   const loadView = async (pId: string, pSesion: DtoLoginAccountRes) => {
      if (pId === "-") {
         setDate(currentDateISO());
         setUserName(pSesion.UserName);
         setActive("Activo");
      }
      const data = getModuleService(pId);
      if (data.ModuleId === pId) {
         setDate(data.CreationDate);
         setUserName(data.DtoUser.UserName);
         setActive(data.IsActive ? "Active" : "Inactivo");
         setName(data.Name);
         setFkCompany(data.DtoCompany.CompanyId);
      }
      const array = await getCompanyService();
      optionSelected(array, data.DtoCompany.CompanyId);
   };

   useEffect(() => {
      loadView(id, vasSesion);
   }, []);

   const btnCheck = (pId: string) => {
      if (pId === "-") {
         createModuleService();
      } else {
         updateModuleService(pId);
      }
   };

   const bottomSheetModalRef = useRef<BottomSheetModal>(null);

   const handlePresentModalPress = () => {
      bottomSheetModalRef.current?.present();
   };
   return (
      <ContainerCustom>
         <EditHeader
            styeContainer={{ paddingHorizontal: 10 }}
            title={id === "-" ? "Crear Modelo" : "Actualizar Modelo"}
            functionBtnCheck={() => btnCheck(id)}
         />
         <Separator />
         <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
               flex: 1,
            }}
         >
            <View
               style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 10,
                  gap: 10,
                  height: "100%",
                  minHeight: ScreenHeight - BarHeight,
               }}
            >
               <Text
                  style={{
                     fontFamily: "Poppins700",
                     fontSize: 15,
                     color: Colors[colorScheme ?? "light"].text,
                  }}
               >
                  Datos Sistema
               </Text>
               <InputText
                  title="Fecha"
                  inputIsRequired
                  value={date}
                  functionChangeText={setDate}
               />
               <InputText
                  title="Usuario"
                  inputIsRequired
                  value={userName}
                  functionChangeText={setUserName}
               />
               <InputText
                  title="Activo"
                  inputIsRequired
                  value={active}
                  functionChangeText={setActive}
               />
               <Text
                  style={{
                     fontFamily: "Poppins700",
                     fontSize: 15,
                     color: Colors[colorScheme ?? "light"].text,
                  }}
               >
                  Datos Principales
               </Text>

               <ButtonIconInput
                  onPress={handlePresentModalPress}
                  title="Fk Company"
                  inputIsRequired
                  value={optionFkCompany.text}
               />

               <InputText
                  title="Nombre Corto"
                  inputIsRequired
                  value={name}
                  functionChangeText={setName}
               />
            </View>
         </ScrollView>
         <ButtonSelectCompany
            bottomSheetModalRef={bottomSheetModalRef}
            options={arrayOptions}
            funOptionSelected={() => optionSelected(arrayOptions, fkCompany)}
         />
      </ContainerCustom>
   );
};

export default edit;
