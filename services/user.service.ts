import { UsuarioApi } from "@/apis/user.api";
import { LogeoUsuario } from "@/interfaces/responses/usuario-res.interface";

export class UsuarioService {
   private apiUsuario = new UsuarioApi();

   private rspLogearse: LogeoUsuario = {} as LogeoUsuario;

   async logearse(usuario: string, contrasenia: string): Promise<LogeoUsuario> {
      await this.apiUsuario.logearse(usuario, contrasenia).then((resp) => {
         this.rspLogearse = resp.data.data;
      });
      return this.rspLogearse;
   }
}
