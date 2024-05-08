import { Text, View, useColorScheme } from "react-native";
import TitleCustom from "../../../components/TitleCustom";
import CardCustom from "../../../components/CardCustom";
import ContainerCustom from "@/components/ContainerCustom";
import { useContext, useState } from "react";
import SectionTitleComponent from "@/components/SectionTitle.component";
import Colors from "@/constants/Colors";
import StatusHomeComponent from "@/components/StatusHome.component";
import WeekSectionComponent from "@/components/WeekSection.component";
import CompanySection from "@/components/CompanySection";
import { DtoCompanyRes } from "@/apis/companies/dto/responses/company.dto";
import { ScrollView } from "react-native-gesture-handler";
import Welcome from "@/components/Welcome";
import { VasSesionContext } from "@/contexts/Sesion.context";
import { getDay, getMonth, getYear } from "@/utils/functions";

const index = () => {
   const { vasSesion } = useContext(VasSesionContext);
   const colorScheme = useColorScheme();
   // const [inputHeader, setInputHeader] = useState<string>("");
   const [arrayCompany, setArrayCompany] = useState<DtoCompanyRes[]>([]);

   return (
      <ContainerCustom>
         <Welcome
            styleContainer={{ padding: 10 }}
            userName={vasSesion.UserName}
         />
         {/* <BarHeightCustom /> */}
         <Text
            style={{
               color: Colors[colorScheme ?? "light"].text,
               textAlign: "center",
               fontFamily: "Poppins800",
               marginBottom: 10,
               fontSize: 20,
            }}
         >
            Compañia 01
         </Text>
         {/* <HeaderSearchComponent
            styleContainer={{ width: "100%", padding: 10 }}
            value={inputHeader}
            functionChangeText={setInputHeader}
            funButtonSearch={() => {}}
            placeholder="Ingrese el valor a buscar"
         /> */}
         <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
               flex: 1,
            }}
         >
            <StatusHomeComponent styleProps={{ paddingHorizontal: 10 }} />
            <SectionTitleComponent
               styleContainer={{ padding: 10 }}
               title={`${getMonth()} ${getYear()}`}
               href="/inicio/company/"
            />

            <WeekSectionComponent
               styleProps={{ paddingHorizontal: 10 }}
               currentDay={getDay()}
            />
            <SectionTitleComponent
               styleContainer={{ padding: 10 }}
               title="Tus Compañias"
               href="/(home)/inicio/company/"
            />
            <SectionTitleComponent
               styleContainer={{ padding: 10 }}
               title="Tus Módulos"
               href="/(home)/inicio/module/"
            />
            <CompanySection
               arrayCompanies={arrayCompany}
               styleContainer={{ paddingHorizontal: 10, gap: 10 }}
            />

            <View
               style={{
                  flex: 1,
                  flexDirection: "column",
                  paddingHorizontal: 10,
               }}
            >
               <TitleCustom
                  textStyle={{ marginTop: 10 }}
                  textSize={20}
                  text="Estadísticas"
               />
               <View
                  style={{
                     // backgroundColor: "green",
                     // flex: 1,
                     width: "100%",
                     height: "auto",
                     flexDirection: "row",
                     flexWrap: "wrap",
                     paddingVertical: 10,
                     gap: 10,
                  }}
               >
                  <CardCustom
                     title="Total ..."
                     text=""
                     iconName={"person-add"}
                     quantity={1}
                     viewBackgroundColor="#2A166D"
                  />
                  <CardCustom
                     title="Total ..."
                     text=""
                     iconName={"person"}
                     quantity={2}
                     viewBackgroundColor="#ff9800"
                  />
                  <CardCustom
                     title="Total ..."
                     text=""
                     quantity={3}
                     iconName={"call"}
                     viewBackgroundColor="#00bcd4"
                  />
                  <CardCustom
                     title="Total ..."
                     text=""
                     quantity={4}
                     iconName={"checkmark-circle"}
                     viewBackgroundColor="#8bc34a"
                  />

                  <CardCustom
                     title="Total ..."
                     text=""
                     quantity={5}
                     iconName={"close-circle"}
                     viewBackgroundColor="#f44336"
                  />
                  <CardCustom
                     title="Total ..."
                     text=""
                     quantity={6}
                     iconName={"school"}
                     viewBackgroundColor="#009688"
                  />
               </View>
               <TitleCustom
                  textStyle={{ marginTop: 10 }}
                  textSize={20}
                  text="¿Qué deseas hacer hoy?"
               />
            </View>
         </ScrollView>
      </ContainerCustom>
   );
};

export default index;
