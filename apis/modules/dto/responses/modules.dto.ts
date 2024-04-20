import { DtoFkUserRes } from "@/apis/users/dto/responses/fk-user.dto";

export class DtoModulesRes {
   ModuleId: string = "";
   Name: string = "";
   CreationDate: string = "";
   IsActive: string = "";
   FkCompanyId: string = "";
   FkUserId = "";
   DtoUser: DtoFkUserRes = new DtoFkUserRes();
}
