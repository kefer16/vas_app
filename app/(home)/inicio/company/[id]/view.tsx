import { ScrollView, Text, View } from "react-native";
import React, {
   useCallback,
   useContext,
   useEffect,
   useMemo,
   useRef,
   useState,
} from "react";
import { router, useLocalSearchParams } from "expo-router";
import ContainerCustom from "@/components/ContainerCustom";

import Separator from "@/components/Separator";
import ViewCardItem, {
   EnuViewCardItem,
   ItfViewCardItem,
} from "@/components/ViewCardItem";
import ViewIconItem from "@/components/ViewIconItem";
import { Building2 } from "lucide-react-native";
import ViewOptionsGroup from "@/components/ViewOptionsGroup";
import ViewHeader from "@/components/view/TitleItem";
import { VasSesionContext } from "@/contexts/Sesion.context";
import { CompanyService } from "@/apis/companies/company.service";
import { DtoCompanyRes } from "@/apis/companies/dto/responses/company.dto";
import {
   BottomSheetBackdrop,
   BottomSheetModal,
   BottomSheetModalProvider,
   BottomSheetView,
} from "@gorhom/bottom-sheet";
import OptionBottomSheet from "@/components/OptionBottomSheet";

const view = () => {
   const {
      mostrarNotificacion,
      activarCarga,
      companiesSesion,
      saveCompaniesSesion,
   } = useContext(VasSesionContext);
   const { id } = useLocalSearchParams<{ id: string }>();
   const [companyData, setCompanyData] = useState<DtoCompanyRes>(
      new DtoCompanyRes()
   );
   const [viewCardSystem, setViewCardSystem] = useState<ItfViewCardItem[]>([]);
   const [viewCardData, setViewCardData] = useState<ItfViewCardItem[]>([]);

   const getCompanyService = async () => {
      const companyItem =
         companiesSesion.find((item) => item.CompanyId === id) ??
         new DtoCompanyRes();

      setCompanyData(companyItem);
      asignViewCardSystem(companyItem);
      asignViewCardData(companyItem);
      // const srvCompany = new CompanyService();
      // activarCarga(true);
      // await srvCompany
      //    .get(id)
      //    .then((resp) => {
      //       setCompanyData(resp);
      //       saveCompanySesion(resp);
      //       asignViewCardSystem(resp);
      //       asignViewCardData(resp);
      //    })
      //    .catch((error) => {
      //       mostrarNotificacion({ tipo: "error", detalle: error.message });
      //    });
      // activarCarga(false);
   };

   const deleteCompanyService = async () => {
      const srvCompany = new CompanyService();
      activarCarga(true);
      await srvCompany
         .delete(id)
         .then((resp) => {
            const companies = companiesSesion.filter(
               (item) => item.CompanyId !== id
            );
            saveCompaniesSesion([...companies]);
            // router.navigate("/(home)/inicio/company/");
            router.back();
         })
         .catch((error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   const loadView = () => {
      getCompanyService();
   };

   const asignViewCardSystem = (pDtoCompany: DtoCompanyRes) => {
      const arrayViewCard: ItfViewCardItem[] = [
         {
            key: "1",
            type: EnuViewCardItem.STRING,
            title: "Fecha Creación",
            value: pDtoCompany.CreationDate
               ? pDtoCompany.CreationDate.toString()
               : "",
         },
         {
            key: "2",
            type: EnuViewCardItem.STRING,
            title: "Usuario Creación",
            value: pDtoCompany.DtoUser.UserName,
         },
         {
            key: "3",
            type: EnuViewCardItem.STRING,
            title: "Activo",
            value: pDtoCompany.IsActive ? "Activo" : "Inactivo",
         },
      ];

      setViewCardSystem(arrayViewCard);
   };

   const asignViewCardData = (pDtoCompany: DtoCompanyRes) => {
      const arrayViewCard: ItfViewCardItem[] = [
         {
            key: "4",
            type: EnuViewCardItem.STRING,
            title: "Nombre Completo",
            value: pDtoCompany.FullName,
         },
         {
            key: "5",
            type: EnuViewCardItem.STRING,
            title: "Descripcion",
            value: pDtoCompany.Description,
         },

         {
            key: "6",
            type: EnuViewCardItem.STRING,
            title: "Correo",
            value: pDtoCompany.Email,
         },
         {
            key: "7",
            type: EnuViewCardItem.STRING,
            title: "Página",
            value: pDtoCompany.Page,
         },
      ];

      setViewCardData(arrayViewCard);
   };

   useEffect(() => {
      loadView();
   }, [companiesSesion]);

   // const sheetRef = useRef<BottomSheet>(null);
   // // const handleClosePress = () => sheetRef.current?.close();
   // const handleOpenPress = () => sheetRef.current?.expand();
   // // callbacks

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

   const onPressEdit = () => {
      router.push({
         pathname: "/(home)/inicio/company/[id]/edit",
         params: { id: id },
      });
   };
   return (
      <ContainerCustom>
         <BottomSheetModalProvider>
            <ViewHeader
               styleContainer={{ paddingHorizontal: 10 }}
               title="Visualizar Compañia"
               onPressEdit={onPressEdit}
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
                     title={companyData.ShortName}
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
                  <OptionBottomSheet onPress={deleteCompanyService} />
               </BottomSheetView>
            </BottomSheetModal>
         </BottomSheetModalProvider>
      </ContainerCustom>
   );
};

export default view;
