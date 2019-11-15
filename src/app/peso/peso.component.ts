import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Chart } from 'angular-highcharts';

import { PesoService } from '../services/peso.service';
import { Pesi, AuthUser } from '../model';
import { Peso } from '../model_body';
import { Series } from 'highcharts';
@Component({
  selector: 'app-peso',
  templateUrl: './peso.component.html',
  styleUrls: ['./peso.component.css']
})
export class PesoComponent implements OnInit {

  pesi: Pesi[];
  peso: Peso;
  authUser: AuthUser;
  id_atleta: number;
  id_peso: number;
  peso_: number;
  note: string;
  page:number;

  //Statistiche
  peso_basso: number = Infinity;
  data_basso: Date = null;
  nota_basso: string = null;
  peso_alto: number = 0;
  data_alto: Date = null;
  nota_alto: string = null;
  peso_media: number = 0;

  chart: Chart;

  constructor(
    private pesoService: PesoService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ){}

  ngOnInit(){
    this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.spinner.show();
    setTimeout(() => {
      this.peso = new Peso();
      this.pesoService.getPesi().subscribe((data: Pesi[]) => {
        this.pesi = data;
        this.initChart();
      });
      this.pesoService.loadPesi(this.authUser.id_atleta);
      this.spinner.hide();
    },1000);
  }

  openPopUp(id_peso: number, conten: any) {
    this.id_peso = id_peso;
    if (this.id_peso != 0) {
      for(let peso of this.pesi){
        if(peso.id_peso == this.id_peso){
          this.note = peso.note;
          this.peso_ = peso.peso;
        }
      }
      this.modalService.open(conten, { ariaLabelledBy: 'modal-basic-titile' });
    } else {
      this.id_atleta = null;
      this.note = null;
      this.peso_ = null;
      this.modalService.open(conten, { ariaLabelledBy: 'modal-basic-titile' });
    }
  }

  addPeso() {
    this.peso.id_atleta = this.authUser.id_atleta;
    this.peso.note = this.note;
    this.peso.peso = this.peso_;
		this.pesoService.addPeso(this.peso).subscribe((data) => {
			if(data['code'] == 200){
          this.pesoService.loadPesi(this.authUser.id_atleta);
          this.modalService.dismissAll('Reason');
          this.toastr.success('Peso aggiunto con successo', 'Successo');
			  }else{
          this.pesoService.loadPesi(this.authUser.id_atleta);
          this.modalService.dismissAll('Reason');
          this.toastr.error('Peso non aggiunto', 'Errore');
			  }
		});
  }

  modifyPeso(){
    this.peso.id_peso = this.id_peso;
    this.peso.id_atleta = this.authUser.id_atleta;
    this.peso.note = this.note;
    this.peso.peso = this.peso_;
		this.pesoService.modifyPeso(this.peso).subscribe((data) => {
			if(data['code'] == 200){
          this.pesoService.loadPesi(this.authUser.id_atleta);
          this.modalService.dismissAll('Reason');
          this.toastr.success('Peso modificato con successo', 'Successo');
			  }else{
          this.pesoService.loadPesi(this.authUser.id_atleta);
          this.modalService.dismissAll('Reason');
          this.toastr.error('Peso non modificato', 'Errore');
			  }
		});
  }
  
  deleteNote(id_peso:number){
    this.pesoService.deletPeso(id_peso).subscribe((data) => {
			if(data['code'] == 200){
				this.pesoService.loadPesi(this.authUser.id_atleta);
				this.modalService.dismissAll('Reason');
				this.toastr.success('Peso eliminato con successo', 'Successo');
			  }else{
          this.pesoService.loadPesi(this.authUser.id_atleta);
				this.modalService.dismissAll('Reason');
				this.toastr.error('Peso non eliminato', 'Errore');
			  }
		});
  }

  openStatistiche(conten: any){
    for(let peso of this.pesi){
      if(this.peso_alto < peso.peso){
        this.peso_alto = peso.peso;
        this.data_alto = peso.data;
        this.nota_alto = peso.note;
      }
      if(this.peso_basso > peso.peso){
        this.peso_basso = peso.peso;
        this.data_basso = peso.data;
        this.nota_basso = peso.note;
      }
    }
    let sommatoria:number = 0;
    let conta:number = 0;
    for(let peso of this.pesi){
      sommatoria += peso.peso;
      conta += 1;
    }
    this.peso_media = sommatoria / conta;
    this.modalService.open(conten, { ariaLabelledBy: 'modal-basic-titile' });
  }

  initChart(){
    let pesi = this.pesi;
    pesi.reverse();
    let chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Grafico'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Peso',
        data: [],
        type: undefined,
      }]
    });
    for(let peso of this.pesi){
      chart.addPoint(peso.peso);
    }
    this.chart = chart;
  }
}