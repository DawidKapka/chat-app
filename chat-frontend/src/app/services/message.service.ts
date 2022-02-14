import { Injectable } from '@angular/core';
import {Message} from "../models/message.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  send(message: Message) {
    return this.http.post('http://localhost:3000/messages', {
      value: message.value,
      sender: message.sender
    });
  }

  get() {
    return this.http.get('http://localhost:3000/messages');
  }
}
