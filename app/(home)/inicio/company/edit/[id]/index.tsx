import React from "react";
import ContainerCustom from "@/components/ContainerCustom";
import EditHeader from "@/components/EditHeader";
import Separator from "@/components/Separator";
import EditCompany from "@/components/edit/company/EditCompany";

const edit = () => {
   return (
      <ContainerCustom>
         <EditHeader
            styeContainer={{ paddingHorizontal: 10 }}
            title="facebook"
         />
         <Separator />
         <EditCompany />
      </ContainerCustom>
   );
};

export default edit;
