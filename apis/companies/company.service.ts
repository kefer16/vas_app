import { CompanyApi } from "./company.api";
import { DtoCreateCompany } from "./dto/requests/create-company.dto";
import { DtoUpdateCompany } from "./dto/requests/update-company.dto";
import { DtoCompanyRes } from "./dto/responses/company.dto";

export class CompanyService {
   private apiCompany: CompanyApi = new CompanyApi();

   private resGetCompany: DtoCompanyRes = new DtoCompanyRes();
   private resGetAllCompany: DtoCompanyRes[] = [];
   private resCreateCompany: DtoCompanyRes = new DtoCompanyRes();
   private resUpdateCompany: DtoCompanyRes = new DtoCompanyRes();
   private resDeleteCompany: boolean = false;

   async get(pId: string): Promise<DtoCompanyRes> {
      await this.apiCompany.get(pId).then((resp) => {
         this.resGetCompany = resp.data.Data;
      });
      return this.resGetCompany;
   }

   async getAll(): Promise<DtoCompanyRes[]> {
      await this.apiCompany.getAll().then((resp) => {
         this.resGetAllCompany = resp.data.Data;
      });
      return this.resGetAllCompany;
   }

   async create(pBody: DtoCreateCompany): Promise<DtoCompanyRes> {
      await this.apiCompany.create(pBody).then((resp) => {
         this.resCreateCompany = resp.data.Data;
      });
      return this.resCreateCompany;
   }

   async update(pId: string, pBody: DtoUpdateCompany): Promise<DtoCompanyRes> {
      await this.apiCompany.update(pId, pBody).then((resp) => {
         this.resUpdateCompany = resp.data.Data;
      });
      return this.resUpdateCompany;
   }

   async delete(pId: string): Promise<boolean> {
      await this.apiCompany.delete(pId).then((resp) => {
         this.resDeleteCompany = resp.data.Data;
      });
      return this.resDeleteCompany;
   }
}
