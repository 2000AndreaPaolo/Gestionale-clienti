import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
    private dashboardService:DashboardService,
    private modalService: NgbModal,
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

  openPopUp(conten: any){
    this.dashboardService.getProgrammazione(this.programma.id_programma).subscribe((data: Programmazioni[]) => {
      let appoggio_data: any[] = [];
      this.vet_date = [];
      this.programmazioni_popup = [];
      for(let dato of data){
        appoggio_data.push(dato.data);
      }
      this.calcolo_massimale(data);
      this.programmazioni_popup = data;
      appoggio_data = appoggio_data.filter((el, i, a) => i === a.indexOf(el))
      this.vet_date = appoggio_data;
      this.modalService.open(conten, { ariaLabelledBy: 'modal-basic-titile' });
    });
  }

  onChangeData(){
    let appoggio = [];
    this.programmazioni_popup = [];
    this.vet_date = [];
    this.dashboardService.getProgrammazione(this.programma.id_programma).subscribe((data: Programmazioni[]) => {
      for(let dato of data){
        if(dato.data == this.filtro_data){
          appoggio.push(dato);
        }
        if(this.vet_date.length == 0){
          this.vet_date.push(this.filtro_data);
        }
      }
      this.programmazioni_popup = appoggio;
      console.log(this.programmazioni_popup);
    });
  }
}
