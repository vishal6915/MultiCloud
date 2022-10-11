import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Popup } from 'ng2-opd-popup/components';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
  public fileString: any;
  sendInputParams: any;
  arr : any;

  or: any = []
  routeData: any;
  constructor(private routes : Router,
   // private popup : Popup
   ) { }

  ngOnInit() {
  }
  changeListener(event: any): void {
    this.readThis(event.target);


}
readThis(inputValue: any): void {
 // this.or="";
  var file: File = inputValue.files[0];
  var myReader: FileReader = new FileReader();
  var fileType = inputValue.parentElement.id;
    myReader.onloadend = (e) => {
      console.log(myReader.result,'report data');
      this.sendInputParams = myReader.result;
      //console.log(this.sendInputParams)
      this.arr = this.sendInputParams.split('"')
      console.log(this.arr)
     // this.arr = this.sendInputParams
     console.log(this.arr)
      for(let i=1; i<this.arr.length-1;i+=2) {
        // if(this.arr[i] === '"' || this.arr[i] === "'" ) {
        //   //console.log(i);
        //   this.or += ' '
        //   continue
        // }
        this.or.push(this.arr[i])
      }
      //this.routeData= this.or.split('  ')
      console.log("original data",this.or)
     // console.log(this.sendInputParams)
      this.fileString = myReader.result as string;
    };
     
    myReader.readAsText(file);
  }
  pricing(){
     this.routes.navigate(['pricing']
    //  ,{queryParams:{data:this.or} }
     )
  }
}
