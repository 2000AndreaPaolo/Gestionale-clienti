import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

import { DashboardService } from '../services/dashboard.service';
import { Programmi, Programmazioni, Schede, Progressioni, AuthUser } from '../model';
import { Programma, Scheda } from '../model_body';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  authUser: AuthUser;
  programma: Programma;
  programmazioni: Programmazioni[];
  programmazioni_popup: Programmazioni[];
  vet_date: any [] = [];
  data_: Date;
  scheda: Scheda;
  progressioni: Progressioni[];
  id_specializzazione: number;
  vet_giorni: number [] = [1,2,3,4,5,6,7];
  max_giorni: number = null;
  filtro_data: Date;

  constructor(
    private router: Router,
    private dashboardService:DashboardService,
    private spinner: NgxSpinnerService
  ){}

  ngOnInit(){
    this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.spinner.show();
    setTimeout(() => {
      this.id_specializzazione = this.authUser.id_specializzazione;
      if(this.authUser.id_specializzazione == 1){
        //Powerlifting
        this.programma = new Programma();
        this.dashboardService.getProgramma(this.authUser.id_atleta).subscribe((data:Programmi[]) => {
          for(let dato of data){
            if(this.programma.data_fine == null){
              this.programma = dato;
            }else if(this.programma.data_fine < dato.data_inizio){
              this.programma = dato;
            }
          }
          //Programmazioni
          this.dashboardService.getProgrammazioneGiorno(this.programma.id_programma).subscribe((data:Programmazioni[]) => {
            this.programmazioni = data;
            if(data.length != 0){
              if(data[0].data != null){
                this.data_ = data[0].data;
                this.calcolo_massimale(this.programmazioni);
              }else{
                this.data_ = null;
              }
            }
          });
        });
      }else{
        this.scheda = new Scheda();
        this.dashboardService.getScheda(this.authUser.id_atleta).subscribe((data: Schede[]) => {
        let primo=1;
          for(let dato of data){
            if(primo == 1){
              this.scheda = dato;
              primo ++;
            }else if((new Date(dato.data_inizio)).getTime() > (new Date(this.scheda.data_fine)).getTime() && (new Date).getTime() > (new Date(this.scheda.data_fine)).getTime()){
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
      this.spinner.hide();
    },1000);
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

  calcolo_massimale(programmazioni: Programmazioni[]){
    this.dashboardService.getMassimale(this.authUser.id_atleta).subscribe((data: any) => {
      for(let programmazione of programmazioni){
        for(let dato of data){
          if(programmazione.id_esercizio == dato[0].id_esercizio){
            programmazione.carico = programmazione.carico * dato[0].peso / 100;
          }
        }
      }
    });
  }

  view(){
    this.router.navigate(['/programma']);
  }
}
