import { InjectionToken } from "@angular/core";

export class Name{
    myName: string = "Arun Kashyap";
}

export class Name2{
    myName: string = "Kashyap Arun";
}

export const NAMETOKEN = new InjectionToken<string>('');


