import { Component, OnInit } from '@angular/core';

import { AuthUser, Programmi, Schede } from '../model';
import { DashboardService } from '../services/dashboard.service';
@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {

  authUser: AuthUser;
  countdown: any;
  massimale_squat: number;
  massimale_panca: number;
  massimale_stacco: number;

  constructor(
    private dashboardService:DashboardService
  ){}

  ngOnInit(){
    this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if(this.authUser.id_specializzazione == 1){
      this.dashboardService.getProgramma(this.authUser.id_atleta).subscribe((data: Programmi[]) => {
        let programma=null;
        for(let dato of data){
          if(programma == null){
            programma = dato;
          }else if(programma.data_fine < dato.data_inizio){
            programma = dato;
          }
        }
        this.countdown = programma.data_fine;
      });
    }else{
      this.dashboardService.getScheda(this.authUser.id_atleta).subscribe((data: Schede[]) => {
        let scheda=null;
        for(let dato of data){
          if(scheda == null){
            scheda = dato;
          }else if(scheda.data_fine < dato.data_inizio){
            scheda = dato;
          }
        }
        this.countdown = scheda.data_fine;
      });
    }
    this.dashboardService.getMassimale(this.authUser.id_atleta).subscribe((data: any) => {
      console.log(data);
      for(let dato of data){
        if(dato[0].peso > 0){
          if(dato[0].descrizione == "Panca piana"){
            this.massimale_panca = dato[0].peso;
          }else if(dato[0].descrizione == "Squat"){
            this.massimale_squat = dato[0].peso;
          }else if(dato[0].descrizione == "Stacco da terra"){
            this.massimale_stacco = dato[0].peso;
          }
        }
      }
    });
  }
}
