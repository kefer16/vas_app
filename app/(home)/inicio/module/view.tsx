import { View, Text, ScrollView } from "react-native";
import React, {
   useCallback,
   useContext,
   useEffect,
   useMemo,
   useRef,
   useState,
} from "react";
import { router, useLocalSearchParams } from "expo-router";
import ViewCardItem, {
   EnuViewCardItem,
   ItfViewCardItem,
} from "@/components/ViewCardItem";
import {
   BottomSheetBackdrop,
   BottomSheetModal,
   BottomSheetModalProvider,
   BottomSheetView,
} from "@gorhom/bottom-sheet";
import ContainerCustom from "@/components/ContainerCustom";
import ViewHeader from "@/components/view/TitleItem";
import Separator from "@/components/Separator";
import ViewIconItem from "@/components/ViewIconItem";
import ViewOptionsGroup from "@/components/ViewOptionsGroup";
import OptionBottomSheet from "@/components/OptionBottomSheet";
import { VasSesionContext } from "@/contexts/Sesion.context";
import { Building2 } from "lucide-react-native";
import { DtoModulesRes } from "@/apis/modules/dto/responses/modules.dto";
import { ModuleContext } from "@/contexts/Module.context";
import { ModuleService } from "@/apis/modules/module.service";

const view = () => {
   const { mostrarNotificacion, activarCarga } = useContext(VasSesionContext);

   const { sesionModules, saveSesionModules } = useContext(ModuleContext);

   const { id } = useLocalSearchParams<{ id: string }>();
   const [moduleData, setModuleData] = useState<DtoModulesRes>(
      new DtoModulesRes()
   );
   const [viewCardSystem, setViewCardSystem] = useState<ItfViewCardItem[]>([]);
   const [viewCardData, setViewCardData] = useState<ItfViewCardItem[]>([]);

   const getModuleService = async () => {
      const item =
         sesionModules.find((item) => item.ModuleId === id) ??
         new DtoModulesRes();

      setModuleData(item);
      asignViewCardSystem(item);
      asignViewCardData(item);
   };

   const deleteModuleService = async () => {
      const srvModule = new ModuleService();
      activarCarga(true);
      await srvModule
         .delete(id)
         .then((resp) => {
            const companies = sesionModules.filter(
               (item) => item.ModuleId !== id
            );
            saveSesionModules([...companies]);

            router.back();
         })
         .catch((error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   const loadView = () => {
      getModuleService();
   };

   const asignViewCardSystem = (pDtoItem: DtoModulesRes) => {
      const arrayViewCard: ItfViewCardItem[] = [
         {
            key: "1",
            type: EnuViewCardItem.STRING,
            title: "Fecha Creación",
            value: pDtoItem.CreationDate
               ? pDtoItem.CreationDate.toString()
               : "",
         },
         {
            key: "2",
            type: EnuViewCardItem.STRING,
            title: "Usuario Creación",
            value: pDtoItem.DtoUser.UserName,
         },
         {
            key: "3",
            type: EnuViewCardItem.STRING,
            title: "Activo",
            value: pDtoItem.IsActive ? "Activo" : "Inactivo",
         },
      ];

      setViewCardSystem(arrayViewCard);
   };

   const asignViewCardData = (pDtoItem: DtoModulesRes) => {
      const arrayViewCard: ItfViewCardItem[] = [
         {
            key: "4",
            type: EnuViewCardItem.STRING,
            title: "Nombre Completo",
            value: pDtoItem.Name,
         },
         {
            key: "5",
            type: EnuViewCardItem.STRING,
            title: "Descripcion",
            value: pDtoItem.DtoCompany.ShortName,
         },
      ];

      setViewCardData(arrayViewCard);
   };

   useEffect(() => {
      loadView();
   }, [sesionModules]);

   const renderBackground = useCallback(
      (props: any) => (
         <BottomSheetBackdrop
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            {...props}
         />
      ),
      []
   );

   const bottomSheetModalRef = useRef<BottomSheetModal>(null);

   // variables
   const snapPoints = useMemo(() => ["25%", "50%"], []);

   // callbacks
   const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
   }, []);
   const handleSheetChanges = useCallback((index: number) => {}, []);

   return (
      <ContainerCustom>
         <BottomSheetModalProvider>
            <ViewHeader
               styleContainer={{ paddingHorizontal: 10 }}
               title="Visualizar Módulo"
               hrefButtonEdit={`/(home)/inicio/module/edit/?id=${id}`}
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
                  }}
               >
                  <ViewIconItem
                     iconLucide={Building2}
                     title={moduleData.Name}
                  />
                  <ViewOptionsGroup functionMoreBtn={handlePresentModalPress} />
                  <ViewCardItem arrayView={viewCardSystem} />
                  <ViewCardItem arrayView={viewCardData} />
               </View>
            </ScrollView>
            <BottomSheetModal
               ref={bottomSheetModalRef}
               index={1}
               snapPoints={snapPoints}
               onChange={handleSheetChanges}
               backdropComponent={renderBackground}
               // style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
               <BottomSheetView style={{ flex: 1, flexDirection: "column" }}>
                  <Text
                     style={{
                        fontSize: 20,
                        fontFamily: "Poppins600",
                        paddingHorizontal: 10,
                     }}
                  >
                     Opciones
                  </Text>
                  <Separator />
                  <OptionBottomSheet onPress={deleteModuleService} />
               </BottomSheetView>
            </BottomSheetModal>
         </BottomSheetModalProvider>
      </ContainerCustom>
   );
};

export default view;
