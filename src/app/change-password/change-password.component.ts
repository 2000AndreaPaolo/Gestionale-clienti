import { Component, OnInit } from '@angular/core';

import {AuthUser} from '../model'
import {AuthenticationService} from '../services/authentication.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user:AuthUser = new AuthUser;
  oldpassword:string;
  newpassword:string;
  checkpassword:string;
  constructor(private authService: AuthenticationService,private toastr: ToastrService) { }

  ngOnInit(){
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  modifyPassword(){
    if(this.newpassword == this.checkpassword)
    {this.authService.modifyPassword(this.user.id_atleta,this.oldpassword,this.newpassword).subscribe((data:any)=>
       { 
         if(data.code == 200)
         this.toastr.success('Password Modificata', 'Successo');
         else if(data.code == 501)
         this.toastr.error('Vecchia password non corretta', 'Errore');
         else if(data.code == 500)
         this.toastr.error('Password non modificata', 'Errore');
       }
    );
      }
    else
      this.toastr.error("Le nuove password non coincidono","Errore")
  }

}
