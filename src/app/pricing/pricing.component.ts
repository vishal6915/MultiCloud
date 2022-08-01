
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import  data from '../jsondata/fdata.json';
// import jsPDF from 'jspdf'; 
//  import html2canvas from 'html2canvas';
 import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


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

  constructor(private activatedRoute:ActivatedRoute) { }
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
  
  
        
  images: any = [
    {
      url: 'data:image/png;base64,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',
      title: 'azure'
    },
    {
      url: 'data:image/png;base64,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',
      title: 'aws'
    },
    {
      url: 'data:image/png;base64,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',
      title: 'google-cloud'
    },
  ]


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: any)=>{
      this.complexitylength=params.data.length-1;
      this.titleEnvName=params.data[0];
      for(let i=1;i<params.data.length;i++){
        this.archcomplexity=params.data[i];
        this.pricingCalculation(this.archcomplexity);
      }

    })
         
    
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
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p',"mm","a4");
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save(this.titleEnvName+'.pdf');
      });
    }
    
  //  savePDF(){
  //       pdfMake.vfs = pdfFonts.pdfMake.vfs;
  //     const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
  //     this.pdfmake.createPdf(documentDefinition).open();
  //    }
   }
     
   


  
 
