import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private httpClient:HttpClient) { }


  getcars(){
    return this.httpClient.get('https://autobackn.herokuapp.com/api/get_all_car');
  }
  getCarByName(name:any){
    return this.httpClient.get('https://autobackn.herokuapp.com/api/car_name/'+name);
  }
  getCarImageByName(name:any){
    return this.httpClient.get('https://autobackn.herokuapp.com/api/get_car_image_by_name/'+name);
  }
  registerUser(data: any){
    return this.httpClient.post('https://autobackn.herokuapp.com/api/registerUser',data);
  }
  loginUser(data: any){
    return this.httpClient.post('https://autobackn.herokuapp.com/api/login',data);
  }
 
}
