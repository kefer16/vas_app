import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ENV_API_URL, ENV_BEARER_TOKEN } from "../config.api";
import { personalizarMensajeError } from "@/utils/functions";
import { DtoCreateCompany } from "./dto/requests/create-company.dto";
import { DtoUpdateCompany } from "./dto/requests/update-company.dto";

export class CompanyApi {
   private bearer = ENV_BEARER_TOKEN;
   private url = `${ENV_API_URL}/v1/companies`;

   async get(pId: string): Promise<AxiosResponse> {
      try {
         const config: AxiosRequestConfig<string> = {
            headers: {
               Authorization: `Bearer ${this.bearer}`,
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${this.url}/${pId}`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async getAll(): Promise<AxiosResponse> {
      try {
         const config: AxiosRequestConfig<string> = {
            headers: {
               Authorization: `Bearer ${this.bearer}`,
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${this.url}/`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async create(pData: DtoCreateCompany): Promise<AxiosResponse> {
      try {
         const config: AxiosRequestConfig<string> = {
            headers: {
               Authorization: `Bearer ${this.bearer}`,
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(pData);

         return await axios.post(`${this.url}/`, body, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async update(pId: string, pData: DtoUpdateCompany): Promise<AxiosResponse> {
      try {
         const config: AxiosRequestConfig<string> = {
            headers: {
               Authorization: `Bearer ${this.bearer}`,
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(pData);

         return await axios.put(`${this.url}/${pId}`, body, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async delete(pId: string): Promise<AxiosResponse> {
      try {
         const config: AxiosRequestConfig<string> = {
            headers: {
               Authorization: `Bearer ${this.bearer}`,
               "Content-Type": "application/json",
            },
         };

         return await axios.delete(`${this.url}/${pId}`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
