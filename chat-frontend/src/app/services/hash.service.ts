import {Injectable} from "@angular/core";
import {Md5} from "ts-md5";

@Injectable({
  providedIn: "root"
})
export class HashService {

  hash(value: string): string {
    return Md5.hashStr(value);
  }
}
