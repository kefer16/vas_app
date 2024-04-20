import { CreateModuleReq } from "./dto/requests/create-module.dto";
import { UpdateModuleReq } from "./dto/requests/update-module.dto";
import { DtoModulesRes } from "./dto/responses/modules.dto";
import { ModuleApi } from "./module.api";

export class ModuleService {
   private apiModule: ModuleApi = new ModuleApi();

   private resGetModule: DtoModulesRes = new DtoModulesRes();
   private resGetAllModule: DtoModulesRes[] = [];
   private resCreateModule: DtoModulesRes = new DtoModulesRes();
   private resUpdateModule: DtoModulesRes = new DtoModulesRes();
   private resDeleteModule: boolean = false;

   async get(pId: string): Promise<DtoModulesRes> {
      await this.apiModule.get(pId).then((resp) => {
         this.resGetModule = resp.data.Data;
      });
      return this.resGetModule;
   }

   async getAll(): Promise<DtoModulesRes[]> {
      await this.apiModule.getAll().then((resp) => {
         this.resGetAllModule = resp.data.Data;
      });
      return this.resGetAllModule;
   }

   async create(pBody: CreateModuleReq): Promise<DtoModulesRes> {
      await this.apiModule.create(pBody).then((resp) => {
         this.resCreateModule = resp.data.Data;
      });
      return this.resCreateModule;
   }

   async update(pId: string, pBody: UpdateModuleReq): Promise<DtoModulesRes> {
      await this.apiModule.update(pId, pBody).then((resp) => {
         this.resUpdateModule = resp.data.Data;
      });
      return this.resUpdateModule;
   }

   async delete(pId: string): Promise<boolean> {
      await this.apiModule.delete(pId).then((resp) => {
         this.resDeleteModule = resp.data.Data;
      });
      return this.resDeleteModule;
   }
}
