export class DtoCompanyRes {
   CompanyId: string = "";
   ShortName: string = "";
   FullName: string = "";
   Description: string = "";
   Email: string = "";
   Page: string = "";
   CreationDate: string = "";
   IsActive: boolean = false;
   FkUserId: string = "";
   DtoUser: DtoUserCompanyRes = new DtoUserCompanyRes();
}

export class DtoUserCompanyRes {
   UserId: string = "";
   UserName: string = "";
}
