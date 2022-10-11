import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError, Observable,retry,Subject, throwError } from 'rxjs';
import { BaseUrl,EndPoints } from '../app/api.urls.constant';
import { archComplexityModel } from '../app/archComplexity.modules';
@Injectable({
  providedIn: 'root'
})
export class ReportDataService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  
 headers= new HttpHeaders()
 .set('Content-Type', 'multipart/form-data')
 .set('Access-Control-Allow-Origin', '*');
 constructor(private http : HttpClient) { 
  // super(http, 'reports');
 }
 
 getArchData(){
  return this.http.get('https://retoolapi.dev/yIbmi7/data');
}
  
}
