import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function delay(ms:number){
  return new Promise(resolve => setTimeout(resolve,ms));
}

export enum Status{
  IDLE,
  SUCCESS,
  ERROR,
  LOADING
}

export class Result<T>{
  status:Status;
  data:T|null;
  error:string|null;

  constructor(status:Status, data:T|null,error:string|null){
    this.data = data;
    this.status = status;
    this.error = error;
  }

  static success<T>(data:T): Result<T> {
    return new Result(Status.SUCCESS,data,null);
  }

  static error<T>(error:Error):Result<null>{
    return new Result(Status.ERROR,null,error.message);
  }

  static loading<T>():Result<null>{
    return new Result(Status.LOADING,null,null);
  }

  static idle<T>():Result<null>{
    return new Result(Status.IDLE,null,null);
  }
}

export function formatPhoneNumber(str:string|null):string{
  const preffixed = `+${str}`
  const segments = preffixed.match(/.{1,4}/g);
  const formatted = segments?.join(' ') ?? '';
  return formatted;
}