export class SuccessfulLoginServerResponse{
    public constructor(
        public token?: string,       
        public userType?: string,
        public fullName?: string,
        public isNewCustomer?: number,
    ){}

}