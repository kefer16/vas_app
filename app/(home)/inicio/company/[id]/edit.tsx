import React, { useContext, useEffect, useState } from "react";
import ContainerCustom from "@/components/ContainerCustom";
import EditHeader from "@/components/EditHeader";
import Separator from "@/components/Separator";
import { ScrollView, Text, View, useColorScheme } from "react-native";
import { VasSesionContext } from "@/contexts/Sesion.context";
import { router, useLocalSearchParams } from "expo-router";
import { CompanyService } from "@/apis/companies/company.service";
import InputText from "@/components/InputText";
import { DtoUpdateCompany } from "@/apis/companies/dto/requests/update-company.dto";
import { currentDateISO } from "@/utils/functions";
import { DtoLoginAccountRes } from "@/apis/account/dto/responses/login-account-res.dto";
import { DtoCreateCompany } from "@/apis/companies/dto/requests/create-company.dto";
import Colors from "@/constants/Colors";
import { DtoCompanyRes } from "@/apis/companies/dto/responses/company.dto";

const edit = () => {
   const colorScheme = useColorScheme();
   const {
      mostrarNotificacion,
      activarCarga,
      vasSesion,
      companiesSesion,
      saveCompaniesSesion,
   } = useContext(VasSesionContext);
   const { id } = useLocalSearchParams<{ id: string }>();

   const [date, setDate] = useState<string>("");
   const [userName, setUserName] = useState<string>("");
   const [active, setActive] = useState<string>("");

   const [shortName, setShortName] = useState<string>("");
   const [fullName, setFullName] = useState<string>("");
   const [description, setDescription] = useState<string>("");
   const [email, setEmail] = useState<string>("");
   const [page, setPage] = useState<string>("");

   const createCompanyService = async () => {
      const srvCompany = new CompanyService();
      const data: DtoCreateCompany = {
         ShortName: shortName,
         FullName: fullName,
         Description: description,
         Email: email,
         Page: page,
         IsActive: true,
         CreationDate: currentDateISO(),
         FkUserId: vasSesion.UserId,
      };
      activarCarga(true);
      await srvCompany
         .create(data)
         .then((resp) => {
            const companies = companiesSesion;
            companies.push(resp);
            saveCompaniesSesion([...companies]);
            router.back();
         })
         .catch((error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   const updateCompanyService = async () => {
      const srvCompany = new CompanyService();
      const data: DtoUpdateCompany = {
         ShortName: shortName,
         FullName: fullName,
         Description: description,
         Email: email,
         Page: page,
         IsActive: true,
      };
      activarCarga(true);
      await srvCompany
         .update(id, data)
         .then((resp) => {
            const companies = companiesSesion.filter(
               (item) => item.CompanyId !== id
            );
            companies.push(resp);
            saveCompaniesSesion([...companies]);
            router.back();
         })
         .catch((error) => {
            mostrarNotificacion({ tipo: "error", detalle: error.message });
         });
      activarCarga(false);
   };

   const getCompanyService = () => {
      const company =
         companiesSesion.find((item) => item.CompanyId === id) ??
         new DtoCompanyRes();
      if (company.CompanyId === id) {
         setDate(company.CreationDate);
         setUserName(company.DtoUser.UserName);
         setActive(company.IsActive ? "Active" : "Inactivo");
         setShortName(company.ShortName);
         setFullName(company.FullName);
         setDescription(company.Description);
         setEmail(company.Email);
         setPage(company.Page);
      }
   };

   const loadView = (pSesion: DtoLoginAccountRes) => {
      if (id === "-") {
         setDate(currentDateISO());
         setUserName(pSesion.UserName);
         setActive("Activo");
      } else {
         getCompanyService();
      }
   };

   useEffect(() => {
      loadView(vasSesion);
   }, []);

   const btnCheck = () => {
      if (id === "-") {
         createCompanyService();
      } else {
         updateCompanyService();
      }
   };

   return (
      <ContainerCustom>
         <EditHeader
            styeContainer={{ paddingHorizontal: 10 }}
            title={id === "-" ? "Crear Compañia" : "Actualizar Compañia"}
            functionBtnCheck={btnCheck}
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
               <InputText
                  title="Nombre Corto"
                  inputIsRequired
                  value={shortName}
                  functionChangeText={setShortName}
               />
               <InputText
                  title="Nombre Completo"
                  inputIsRequired
                  value={fullName}
                  functionChangeText={setFullName}
               />
               <InputText
                  title="Descripción"
                  value={description}
                  functionChangeText={setDescription}
               />
               <InputText
                  title="Correo"
                  keyboardType="email-address"
                  inputIsRequired
                  value={email}
                  functionChangeText={setEmail}
               />
               <InputText
                  title="Página"
                  keyboardType="url"
                  value={page}
                  functionChangeText={setPage}
               />
            </View>
         </ScrollView>
      </ContainerCustom>
   );
};

export default edit;
