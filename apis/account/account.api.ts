import axios, { AxiosResponse } from "axios";
import { API_URL, BEARER_TOKEN } from "@env";
import { personalizarMensajeError } from "@/utils/functions";
import { ActiveAccountReqDto } from "./dto/requests/active-account-req.dto";
import { CreateAccountReqDto } from "./dto/requests/create-account-req.dto";
import { LoginAccountReqDto } from "./dto/requests/login-account-req.dto";

const ENV_API_URL: string = API_URL ?? "";
const ENV_BEARER_TOKEN: string = BEARER_TOKEN ?? "";

export class AccountApi {
   private bearer = ENV_BEARER_TOKEN;
   private url = `${ENV_API_URL}/v1/accounts`;

   async create(data: CreateAccountReqDto): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${this.bearer}`,
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);
         console.log(body);

         return await axios.post(`${this.url}/create`, body, config);
      } catch (error: any) {
         console.log(error.response.data);

         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async activate(pBody: ActiveAccountReqDto): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${this.bearer}`,
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(pBody);
         console.log(this.url);
         console.log(body);

         return await axios.put(`${this.url}/activate`, body, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
   async login(pBody: LoginAccountReqDto): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${this.bearer}`,
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(pBody);

         return await axios.post(`${this.url}/login`, body, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
