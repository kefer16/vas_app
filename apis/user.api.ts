import axios, { AxiosResponse } from "axios";
import { API_URL, BEARER_TOKEN } from "@env";
import { personalizarMensajeError } from "@/utils/functions";
import { ActualizarIndividualContraseniaRequest } from "@/interfaces/responses/usuario-res.interface";

const ENV_API_URL: string = API_URL ?? "";
const ENV_BEARER_TOKEN: string = BEARER_TOKEN ?? "";

export class UsuarioApi {
   private bearer = ENV_BEARER_TOKEN;
   private url = `${ENV_API_URL}/usuario`;

   async logearse(
      usuario: string,
      contrasenia: string
   ): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${this.bearer}`,
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify({ usuario, contrasenia });
         return await axios.post(`${this.url}/login`, body, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async registrarIndividual(data: any): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${this.bearer}`,
               "Content-Type": "application/json",
            },
         };
         const body = JSON.stringify(data);

         return await axios.post(
            `${this.url}/registrar_individual`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async actualizarIndividual(ID: string, data: any): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${this.bearer}`,
               "Content-Type": "application/json",
            },
            params: {
               usuario_id: ID,
            },
         };
         const body = JSON.stringify(data);

         return await axios.put(
            `${this.url}/actualizar_individual`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async actualizarIndividualContrasenia(
      ID: string,
      data: ActualizarIndividualContraseniaRequest
   ): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${this.bearer}`,
               "Content-Type": "application/json",
            },
            params: {
               usuario_id: ID,
            },
         };
         const body = JSON.stringify(data);
         return await axios.put(
            `${this.url}/actualizar_individual_contrasenia`,
            body,
            config
         );
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
   async listarIndividual(ID: string): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${this.bearer}`,
               "Content-Type": "application/json",
            },
            params: {
               usuario_id: ID,
            },
         };

         return await axios.get(`${this.url}/listar_individual`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async listarGrupal(): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${this.bearer}`,
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${this.url}/listar_grupal`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async listarGrupalActivos(): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${this.bearer}`,
               "Content-Type": "application/json",
            },
         };

         return await axios.get(`${this.url}/listar_grupal_activos`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }

   async eliminarIndividual(ID: string): Promise<AxiosResponse> {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${this.bearer}`,
               "Content-Type": "application/json",
            },
            params: {
               usuario_id: ID,
            },
         };
         return await axios.delete(`${this.url}/eliminar_indivual`, config);
      } catch (error: any) {
         error.message = personalizarMensajeError(error);
         return Promise.reject(error);
      }
   }
}
