import { View } from "react-native";
import ContainerCustom from "../../../components/ContainerCustom";
import HeaderCustom from "../../../components/HeaderCustom";
import TitleCustom from "../../../components/TitleCustom";

const Index = () => {
   return (
      <ContainerCustom>
         <HeaderCustom
            title="Reportes"
            isSecondaryPage={false}
            urlBack={"/(home)/inicio/"}
         />

         <View
            style={{
               flex: 1,
               flexDirection: "column",
               paddingHorizontal: 10,
               paddingTop: 10,
               gap: 10,
            }}
         >
            <TitleCustom text="Generar Reporte de Postulantes" textSize={15} />
         </View>
      </ContainerCustom>
   );
};

export default Index;
