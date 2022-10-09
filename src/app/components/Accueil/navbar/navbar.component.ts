import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nocli=true;
  cli=false;
  user_name:any;
  user_lname:any;
  token:any;
  user_id:any;
  username:any;
  loginuser:any=false;
  register:any=true;
  tester:any;
  card_id_or_passeport: any;
  driving_license: any;
  age: any;
  
  constructor(private dataService:ServicesService ,private router: Router) { }

  ngOnInit(): void {
    this.GetAllItems();
    this. getUserInfo();

  }
  GetAllItems(){
     
    this.getUserInfo();
      if(this.user_name!=null){
        this.nocli=false;
        this.cli=true;
    
      }
     
    }

    userlogout(event: MouseEvent) {
        event.preventDefault();
        localStorage.clear();
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      
   
    }

    
    change_login_status(){
      this.loginuser=true;
      localStorage.setItem('loginuser', this.loginuser);
      this.register = false;
      localStorage.setItem('registeruser', this.register);  
     this.router.navigate(['/']).then(() => {
       window.location.reload();
     });
        }
    change_reg_status(){

      this.register=true;

      localStorage.setItem('registeruser', this.register);

      this.loginuser=false;
      localStorage.setItem('loginuser', this.loginuser);   
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }
    getUserInfo() {
      const token = this.getToken();
      let payload;
      if (token) {
        payload = token.split(".")[1];
        payload = window.atob(payload);
        this.card_id_or_passeport=JSON.parse(payload).card_id_or_passeport;
        this.user_name=JSON.parse(payload).first_name;
        this.driving_license=JSON.parse(payload).driving_license;
        this.age=JSON.parse(payload).age;
        this.user_lname=JSON.parse(payload).last_name;
        this.username=JSON.parse(payload).username;
        this.user_id=JSON.parse(payload).user_id;

        return JSON.parse(payload);
      } else {
        return null;
      }
    }
    
     getToken() {
      return localStorage.getItem("token");
    }
}
