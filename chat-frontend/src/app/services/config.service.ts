import {Injectable} from "@angular/core";

var configJson = require('../../../config.json');

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  getApiUrl(): string {
    return configJson.apiUrl;
  }

}

