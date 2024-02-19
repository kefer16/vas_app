import { AccountApi } from "./account.api";
import { ActiveAccountReqDto } from "./dto/requests/active-account-req.dto";
import { CreateAccountReqDto } from "./dto/requests/create-account-req.dto";
import { LoginAccountReqDto } from "./dto/requests/login-account-req.dto";
import { LoginAccountResDto } from "./dto/responses/login-account-res.dto";

export class AccountService {
   private apiAccount: AccountApi = new AccountApi();
   private rspActiveAccount: boolean = false;
   private rspCreateAccount: boolean = false;
   private rspLoginAccount: LoginAccountResDto = {} as LoginAccountResDto;

   async create(pBody: CreateAccountReqDto): Promise<boolean> {
      await this.apiAccount.create(pBody).then((resp) => {
         this.rspCreateAccount = resp.data.Data;
      });
      return this.rspCreateAccount;
   }

   async activate(pBody: ActiveAccountReqDto): Promise<boolean> {
      await this.apiAccount.activate(pBody).then((resp) => {
         this.rspActiveAccount = resp.data.Data;
      });
      return this.rspActiveAccount;
   }

   async login(pBody: LoginAccountReqDto): Promise<LoginAccountResDto> {
      await this.apiAccount.login(pBody).then((resp) => {
         this.rspLoginAccount = resp.data.Data;
      });
      return this.rspLoginAccount;
   }
}
