import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { NoteService } from '../services/note.service';
import { Note, AuthUser } from '../model';
import { Nota } from '../model_body';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  authUser: AuthUser;
  note: Note[];
  nota: Nota;
  id_note: number;
  note_: string;
  page:number;

  constructor(
    private noteService: NoteService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.nota = new Nota();
    this.noteService.getNote().subscribe((data: Note[]) => {
      this.note = data;
    });
    this.noteService.loadNote(this.authUser.id_atleta);
  }

  openPopUp(id_note: number, conten: any) {
		this.id_note = id_note;
		if (this.id_note != 0) {
			for(let nota of this.note){
				if(nota.id_note == this.id_note){
					this.note_ = nota.note;
				}
			}
			this.modalService.open(conten, { ariaLabelledBy: 'modal-basic-titile' });
		} else {
      this.note_ = null;
			this.modalService.open(conten, { ariaLabelledBy: 'modal-basic-titile' });
		}
  }
  
  addNote() {
    this.nota.id_atleta = this.authUser.id_atleta;
    this.nota.note = this.note_;
		this.noteService.addNote(this.nota).subscribe((data) => {
			if(data['code'] == 200){
          this.noteService.loadNote(this.authUser.id_atleta);
          this.modalService.dismissAll('Reason');
          this.toastr.success('Nota aggiunta con successo', 'Successo');
			  }else{
          this.noteService.loadNote(this.authUser.id_atleta);
          this.modalService.dismissAll('Reason');
          this.toastr.error('Nota non aggiunta', 'Errore');
			  }
		});
  }

  modifyNote(){
    this.nota.id_note = this.id_note;
    this.nota.id_atleta = this.authUser.id_atleta;
    this.nota.note = this.note_;
		this.noteService.modifyNote(this.nota).subscribe((data) => {
			if(data['code'] == 200){
          this.noteService.loadNote(this.authUser.id_atleta);
          this.modalService.dismissAll('Reason');
          this.toastr.success('Nota modificata con successo', 'Successo');
			  }else{
          this.noteService.loadNote(this.authUser.id_atleta);
          this.modalService.dismissAll('Reason');
          this.toastr.error('Nota non modificata', 'Errore');
			  }
		});
  }

  deleteNote(id_note:number){
    this.noteService.deletNote(id_note).subscribe((data) => {
			if(data['code'] == 200){
				this.noteService.loadNote(this.authUser.id_atleta);
				this.modalService.dismissAll('Reason');
				this.toastr.success('Nota eliminata con successo', 'Successo');
			  }else{
          this.noteService.loadNote(this.authUser.id_atleta);
				this.modalService.dismissAll('Reason');
				this.toastr.error('Nota non eliminata', 'Errore');
			  }
		});
  }
}
