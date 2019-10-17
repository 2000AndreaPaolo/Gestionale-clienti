import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardService } from '../services/dashboard.service';
import { Programmi, Programmazioni, AuthUser } from '../model';
import { Programma } from '../model_body';
@Component({
  selector: 'app-programma-completo',
  templateUrl: './programma-completo.component.html',
  styleUrls: ['./programma-completo.component.css']
})
export class ProgrammaCompletoComponent implements OnInit {

  authUser: AuthUser;
  programma: Programma;
  programmazioni: Programmazioni[];
  vet_date: any [] = [];
  data_: Date;
  filtro_data: Date;

  constructor(
    private router: Router,
    private dashboardService:DashboardService
  ){}

  ngOnInit(){
    this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if(this.authUser.id_specializzazione != 1){
      this.router.navigate(['/dashboard']);
    }
    this.programma = new Programma();
    this.programmazioni = null;
      this.dashboardService.getProgramma(this.authUser.id_atleta).subscribe((data:Programmi[]) => {
        for(let dato of data){
          /*if(this.programma){
            this.programma = dato;
          }else if(this.programma.data_fine < dato.data_inizio){
            this.programma = dato;
          }*/
          if(this.programma.data_fine == null){
            this.programma = dato;
          }else if(this.programma.data_fine < dato.data_inizio){
            this.programma = dato;
          }
        }
        this.view();
    });
  }

  view(){
    this.dashboardService.getProgrammazione(this.programma.id_programma).subscribe((data: Programmazioni[]) => {
      let appoggio_data: any[] = [];
      this.vet_date = [];
      this.programmazioni = [];
      for(let dato of data){
        appoggio_data.push(dato.data);
      }
      this.calcolo_massimale(data);
      this.programmazioni = data;
      appoggio_data = appoggio_data.filter((el, i, a) => i === a.indexOf(el))
      this.vet_date = appoggio_data;
    });
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

  onChangeData(){
    let appoggio = [];
    this.programmazioni = [];
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
      this.calcolo_massimale(appoggio);
      this.programmazioni = appoggio;
    });
  }
}
