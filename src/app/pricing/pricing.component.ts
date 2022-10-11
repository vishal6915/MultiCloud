
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import  data from '../jsondata/fdata.json';
// import jsPDF from 'jspdf'; 
//  import html2canvas from 'html2canvas';
 import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CookieService } from 'ngx-cookie-service';
import { ReportDataService } from '../report-data.service';


export interface Series{
  meterName1:any,
  ram1:any,
  meterName2:any,
  ram2:any,
  meterName3:any,
  ram3:any,
  armskuname1:any,
  armskuname2:any,
  armskuname3:any,
  price1:any,
  price2:any,
  price3:any

}

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit,Series {
  title = 'Multi_Cloud_ROI';
  meterName: any;
  var:any;
  pdfmake: any;

  constructor(
    private activatedRoute:ActivatedRoute,
    public cookie : CookieService,
    public reportDataService : ReportDataService) { }
  armskuname1: any;
  armskuname2: any;
  armskuname3: any;
  price1: any;
  price2: any;
  price3: any;
  meterName1: any;
  ram1: any;
  meterName2: any;
  ram2: any;
  meterName3: any;
  ram3: any;
  //jsonData: any[] = data;
  data_filter:any;
  complexitylength:any;
  archcomplexity:any;
  mname:string="";
  ram:any;
  priceArray:any=[];
  titleEnvName:any;
  data:Series=<any>[];
  suggestion:any;
  content : any[] = [];
  arrdata : any[] = [];
  
        
  images: any = [
    {
      url:'assets/images/Azure-ROI.png',
      title: 'azure'
    },
    {
      url:'assets/images/aws-ROI.png',
      title: 'aws'
    },
    {
      url:'assets/images/GCP-ROI.png',   
      title: 'google-cloud'
    },
  ]


  ngOnInit() {
    ///passing parameters as input from a file
    this.suggestion = "Google"
    this.fillData();
    console.log("in pricing")
   
  }
    
      

    
  fillData(){
    this.reportDataService.getArchData().subscribe((data:any) =>{
      let len = (data.length - 1);
      // to get the last item in array
      console.log("len", len)
      let itemsLen =  Object.keys(data[len]).length
      // to get the no.of key pair values at a give index
      console.log("data in get", data[len].Env_Name)
      this.titleEnvName = data[len].Env_Name;
     // console.log(data[len][1], "data item")
        for(let i=2,j=1;i<itemsLen;i++,j++){
          this.archcomplexity = data[len]['App_Arch_Complexity_'+j];
          console.log("inside for loop",this.archcomplexity)
          this.pricingCalculation(this.archcomplexity);
          
        }
      //this.arrdata = data[0].Arch_Complexity.split('"');
      // this.complexitylength= this.arrdata.length;
      // for(let i=1;i<this.complexitylength;i=i+1){
      //    this.archcomplexity= this.arrdata[i];
      //    this.pricingCalculation(this.archcomplexity);

      // }

      //console.log("complexity data in api", data[0].Arch_Complexity)

    });
  }
  pricingCalculation(e:any){
      if(e=="Simple"){
        //this.mname='F4s v2';
        // this.data.ram1='8 GB';
        // this.data.ram2='8 GB';
        // this.data.ram3='16 GB';
        // this.data.meterName1="F4s v2";
      
        
        this.priceArray.push({ram1:'8 GB',
        ram2:'8 GB',
        ram3:'16 GB',
        meterName1:"F4s v2",
        meterName2:'c4.xlarge',
        meterName3:'c2 series',
        armskuname1:'Standard_F4s_v2',
        armskuname2:'EC2_4.xlarge',
        armskuname3:'c2-standard-4',
        price1:'0.169',
        price2:'0.199',
        price3:'0.167'   
      
      })
      }
      //console.log("testing content",this.data_filter)
      if(e=="Medium"){
       
        this.priceArray.push({ram1:'16 GB',
        ram2:'16 GB',
        ram3:'32 GB',
        meterName1:"F8s v2",
        meterName2:'c4.2xlarge',
        meterName3:'c2 series',
        armskuname1:'Standard_F8s_v2',
        armskuname2:'EC2_4.2xlarge',
        armskuname3:'c2-standard-8',
        price1:'0.338',
        price2:'0.398',
        price3:'0.334'   
      
      })
        
      }
      if(e=="Complex"){
       

        this.priceArray.push({ram1:'32 GB',
        ram2:'32 GB',
        ram3:'64 GB',
        meterName1:"F16s v2",
        meterName2:'c4.4xlarge',
        meterName3:'c2 series',
        armskuname1:'Standard_F16s_v2',
        armskuname2:'EC2_4.4xlarge',
        armskuname3:'c2-standard-16',
        price1:'0.677',
        price2:'0.796',
        price3:'0.668'   
      
      })
      }
    //   this.priceArray.push(this.data)
    //  // this.priceArray.push(this.ram)
    //   console.log("Array content",this.priceArray);
      //console.log(this.data_filter[0].unitPrice,this.data_filter[0].armSkuName)

  }
  // dataFilter(meterName:string){
  
  //   console.log()
  //   this.data_filter = this.jsonData.filter(
  //     (element) => element.type ==="DevTestConsumption" && element.meterName==meterName)
     
  //     return this.data_filter.unitPrice;

  // }
 // @ViewChild('content',{static:false}) content!: ElementRef ;  
  savePDF(){
    
      let DATA: any = document.getElementById('content');
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 208;
       
        
        console.log("height , width",canvas.height,canvas.width)
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
       
        console.log("file height",fileHeight)
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p',"mm","a4");
        let position = 0;
       
        PDF.addImage(FILEURI,'png', 0, position,fileWidth,fileHeight)
              let today = new Date();
              let dd = String(today.getDate()).padStart(2, '0');
              let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
              let yyyy = today.getFullYear();

              let todayDate =  dd + mm +  yyyy;
             PDF.save(this.titleEnvName+' Multi-Cloud-ROI_'+todayDate+'.pdf');
      });

    }
    
  //  savePDF(){
  //       pdfMake.vfs = pdfFonts.pdfMake.vfs;
  //     const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
  //     this.pdfmake.createPdf(documentDefinition).open();
  //    }
   }
      //canvas.width = 1000;
         // canvas.width=1900;
        // canvas.height=1900;height , width 1068 1192
         //let fileHeight = 186.36;
          //PDF.addImage(FILEURI, 'png', 0, position,fileWidth,fileHeight,'NONE');
   


  
 
