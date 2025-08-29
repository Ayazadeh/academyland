import { Expose, Type } from "class-transformer";
import { IdentityDto } from "../Auth.dto";

export class LoginDto { 
    @Expose()
    @Type(() => IdentityDto) 
    identity: IdentityDto;

    @Expose()
    access_token: string;

    @Expose()
    refresh_token: string;

    @Expose()
    expires_in: number;
}