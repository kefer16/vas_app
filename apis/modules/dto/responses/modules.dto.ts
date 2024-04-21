import { DtoFkCompanyRes } from "@/apis/companies/dto/responses/fk-company.dto";
import { DtoFkUserRes } from "@/apis/users/dto/responses/fk-user.dto";

export class DtoModulesRes {
   ModuleId: string = "";
   Name: string = "";
   CreationDate: string = "";
   IsActive: string = "";
   DtoCompany: DtoFkCompanyRes = new DtoFkCompanyRes();
   DtoUser: DtoFkUserRes = new DtoFkUserRes();
}
