import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/service/services.service';
import { User } from 'src/app/class/user';
@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  loginuser:any=false;
  register:any=true;
  forgot=false;
  logsubmitted= false;
  data: any;
  token: any;
  form : FormGroup | any;
 
  submitted= false;

  user = new User();
  inco=false;
  password: any;
  constructor(private _formBuilder: UntypedFormBuilder,private dataService:ServicesService,private router: Router) { }
username:any;
  ngOnInit(): void {
    this.LoginForm();




    
  }



  LoginForm(){

    this.form = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],

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
  forg(){
    
    this.forgot=!this.forgot;

  }
  get f(){

    return this.form.controls;}
   login(){
    this.submitted = true;
    if(this.form.invalid) {
      return;   }
     
       this.dataService.loginUser(this.user).subscribe(res =>{
         this.data = res;
         if(this.data.status ===1) {
          this.inco=false;
           this.token = this.data.data.token;
           localStorage.setItem('token', this.token);
           
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
           this.logsubmitted = true;


         }
         if(this.data.status ===0){
          this.inco=true;
         }
        

       }
       ,
      (error) => {

        console.error('erroooooooooooooooooor')
     
      });


   }
  








   
}
