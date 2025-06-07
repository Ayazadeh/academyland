import type { Identity } from "./Auth.interface";
import { Expose } from "class-transformer";

export class IdentityDto implements Identity {
    @Expose()
    username: string;

    @Expose()
    email?: string;

    @Expose()
    first_name?: string;

    @Expose()
    last_name?: string;
}