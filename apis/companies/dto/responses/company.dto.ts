export class DtoCompanyRes {
   CompanyId: string = "";
   ShortName: string = "";
   FullName: string = "";
   Description: string = "";
   Email: string = "";
   Page: string = "";
   CreationDate: Date = new Date();
   IsActive: boolean = false;
   FkUserId: string = "";
   DtoUser: DtoUserCompanyRes = new DtoUserCompanyRes();
}

export class DtoUserCompanyRes {
   UserId: string = "";
   UserName: string = "";
}
