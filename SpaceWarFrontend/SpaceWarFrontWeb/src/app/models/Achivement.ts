import { ILoginResponse } from "./ILoginResponse";
import { MasterAchivement } from "./MasterAchivement";

export interface Achivement{
    userm: ILoginResponse;
    masterAchivement: MasterAchivement;
    id?:any;
}