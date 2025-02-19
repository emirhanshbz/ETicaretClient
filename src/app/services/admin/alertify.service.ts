import { Injectable } from '@angular/core';
declare var alertify: any;
//alertifyjs'i özelleştirmek için kullanıyoruz.

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  //message(message: string, messageType: MessageType, position: Position, delay: number = 3, dismissOthers: boolean = false) {
    message(message: string, options: Partial<AlertifyOptions>) { //partial ile tüm alanları zorunlu olmaktan çıkarıp isteğe bağlı hale getiriyoruz.
    alertify.set('notifier','delay', options.delay);
    alertify.set('notifier','position', options.position);
    const msj = alertify[options.messageType](message); //hgangi mesaj türündeyse o türden alertify fonksiyonunu çağırır.
    if(options.dismissOthers == true) 
      msj.dismissOthers();
  }

  dismiss() {
    alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position: Position = Position.BottomRight;
  delay: number = 3;
  dismissOthers: boolean = false;
}

export enum MessageType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum Position {
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"
}