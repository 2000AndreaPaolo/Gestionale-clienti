import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { PesoService } from '../services/peso.service';
import { Pesi, AuthUser } from '../model';
import { Peso } from '../model_body';
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

  constructor(
    private pesoService: PesoService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ){}

  ngOnInit(){
    this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.peso = new Peso();
    this.pesoService.getPesi().subscribe((data: Pesi[]) => {
      //this.pesi = data;
      let appoggio: any[] =[];
      for(let dato of data){
        if(dato.id_atleta == this.authUser.id_atleta){
          appoggio.push(dato);
        }
      }
      this.pesi = appoggio;
    });
    this.pesoService.loadPesi();
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
          this.pesoService.loadPesi();
          this.modalService.dismissAll('Reason');
          this.toastr.success('Peso aggiunto con successo', 'Successo');
			  }else{
          this.pesoService.loadPesi();
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
          this.pesoService.loadPesi();
          this.modalService.dismissAll('Reason');
          this.toastr.success('Peso modificato con successo', 'Successo');
			  }else{
          this.pesoService.loadPesi();
          this.modalService.dismissAll('Reason');
          this.toastr.error('Peso non modificato', 'Errore');
			  }
		});
  }
  
  deleteNote(id_peso:number){
    this.pesoService.deletPeso(id_peso).subscribe((data) => {
			if(data['code'] == 200){
				this.pesoService.loadPesi();
				this.modalService.dismissAll('Reason');
				this.toastr.success('Peso eliminato con successo', 'Successo');
			  }else{
          this.pesoService.loadPesi();
				this.modalService.dismissAll('Reason');
				this.toastr.error('Peso non eliminato', 'Errore');
			  }
		});
  }
}