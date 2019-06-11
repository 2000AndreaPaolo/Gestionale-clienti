import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../services/dashboard.service';
import { AuthenticationService } from '../services/authentication.service';
import { Programmi, Programmazioni, Schede, Progressioni, AuthUser } from '../model';
import { Programma, Programmazione, Scheda, Progressione } from '../model_body';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  authUser: AuthUser;
  programma: Programma;
  programmazioni: Programmazioni[];
  data: Date;
  scheda: Scheda;
  progressioni: Progressioni[];
  id_specializzazione: number;
  vet_giorni: number [] = [1,2,3,4,5,6,7];
  max_giorni: number = null;

  constructor(
    private dashboardService:DashboardService,
    private authService: AuthenticationService
  ){}

  ngOnInit(){
    this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.id_specializzazione = this.authUser.id_specializzazione;
    if(this.authUser.id_specializzazione == 1){
      //Powerlifting
      this.programma = new Programma();
      this.dashboardService.getProgramma(this.authUser.id_atleta).subscribe((data:Programmi[]) => {
        for(let dato of data){
          if(this.programma){
            this.programma = dato;
          }else if(this.programma.data_fine < dato.data_inizio){
            this.programma = dato;
          }
        }
        //Programmazioni
        this.dashboardService.getProgrammazioneGiorno(this.programma.id_programma).subscribe((data:Programmazioni[]) => {
          this.programmazioni = data;
          this.data = data[0].data;
        });
      });
    }else{
      this.scheda = new Scheda();
      this.dashboardService.getScheda(this.authUser.id_atleta).subscribe((data: Schede[]) => {
        for(let dato of data){
          if(this.scheda){
            this.scheda = dato;
          }else if(this.scheda.data_fine < dato.data_inizio){
            this.scheda = dato;
          }
        }
        //Progressioni
        this.dashboardService.getProgressione(this.scheda.id_scheda).subscribe((data:Progressioni[]) => {
          for(let p of data){
            if(this.max_giorni){
              this.max_giorni = p.giorno;
            }else if(this.max_giorni < p.giorno){
              this.max_giorni = p.giorno;
            }
          }
          this.progressioni = data;
        });
      });
    }
  }

  progressioniFiltrate(giorni){
    let appoggio: any[] = [];
    for(let progressione of this.progressioni){
      if(progressione.giorno == giorni){
        appoggio.push(progressione);
      }
    }
    return appoggio;
  }
}
