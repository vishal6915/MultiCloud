import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService, popupObject, popupDefaultData } from '../../services/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  popupData: popupObject = popupDefaultData;
  constructor(private routes: Router, private popupService: PopupService) { }
  ngOnInit(): void {
    this.popupService.popupData.subscribe(
      (popupData: popupObject): void => {
        console.log('came');
        this.popupData = popupData;
        this.hidePopup();
      }
    );
  }
  hidePopup(){
    setTimeout(() => {
      this.popupData.showPopup = false;
      console.log('gone');
      if (this.popupData.routing) {
        this.routes.navigate([this.popupData.route]);
      }
    }, this.popupData.timeout);
  }
}