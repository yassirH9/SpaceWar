import { ILoginResponse } from './ILoginResponse'
import { IMasterAchivement } from './IMasterAchivement';
export interface IAchivement{
    userm:ILoginResponse;
    masterAchivement:IMasterAchivement;
    id:number;
}