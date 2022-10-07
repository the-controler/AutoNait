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
  constructor(private dataService:ServicesService ,private router: Router) { }

  ngOnInit(): void {
    this.GetAllItems();
  }
  GetAllItems(){
    this.token=localStorage.getItem('token');
      this.user_id=localStorage.getItem('user_card_id_or_passeport');
      this.user_name=localStorage.getItem('user_fname');
      this.user_lname=localStorage.getItem('user_lname');
      this.username=localStorage.getItem('username');
      
      if(this.token!=null){
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
    
}
