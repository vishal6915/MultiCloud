import { EventEmitter, Injectable } from '@angular/core';
export interface popupObject {
  showPopup: boolean;
  timeout: number;
  message: string;
  routing: boolean;
  route: string;
}
export const popupDefaultData: popupObject = {
  showPopup: false,
  timeout: 5000,
  message: "",
  routing: false,
  route: "",
}
@Injectable({
  providedIn: 'root'
})
export class PopupService {
  popupData = new EventEmitter<popupObject>();

  constructor() { }
  updateData(
    showPopup: boolean = popupDefaultData.showPopup,
    timeout: number = popupDefaultData.timeout,
    message: string = popupDefaultData.message,
    routing: boolean = popupDefaultData.routing,
    route: string = popupDefaultData.route
  ) {
    console.log(popupDefaultData);
    console.log(showPopup);
    console.log(timeout);
    console.log(message);
    console.log(routing);
    console.log(route);
    this.popupData.emit(
      {
        showPopup,
        timeout,
        message,
        routing,
        route
      }
    );
  }
}