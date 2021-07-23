import { Component, OnInit } from '@angular/core';
import { Especial } from 'src/app/model/especial.model';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service'

@Component({
	selector: 'app-specials',
	templateUrl: './specials.component.html',
	styleUrls: ['./specials.component.scss']
})
export class SpecialsComponent implements OnInit {
	especiales: Especial[] = [];
	boxTitle: string = '';
	showModal: boolean = false;
	selectedSpecial: Especial = new Especial();
	newImage: boolean = false;
	mode: string = '';

	constructor(private as: ApiService, private cms: ClassMapperService) {}

	ngOnInit(): void {
		this.loadEspeciales();
	}

	loadEspeciales(): void {
		this.as.getEspeciales().subscribe(result => {
			this.especiales = this.cms.getEspeciales(result.list);
			console.log(this.especiales);
		});
	}

	addNew(ev: MouseEvent): void {
		ev && ev.preventDefault();
		this.boxTitle = 'Nuevo especial';
		this.selectedSpecial = new Especial();
		this.showModal = true;
		this.newImage = false;
		this.mode = 'new';
	}

	editEspecial(especial: Especial): void {
		this.boxTitle = 'Editar especial';
		this.selectedSpecial = this.cms.getEspecial(especial.toInterface());
		this.showModal = true;
	}

	deleteEspecial(especial: Especial): void {
		const conf = confirm('¿Estás seguro de querer borrar el especial "' + especial.nombre + '"?');
		if (conf) {
			this.as.deleteEspecial(especial.id).subscribe(result => {
				if (result.status == 'ok') {
					this.loadEspeciales();
					alert('¡Especial borrado!');
				}
				else {
					alert('¡Ocurrió un error al borrar el especial!');
				}
			});
		}
	}
	
	closeModal(ev: MouseEvent|null = null): void {
		ev && ev.preventDefault();
		this.showModal = false;
	}
	
	openAddImage(): void {
		const obj = document.getElementById('add-file');
		obj && obj.click();
	}
	
	onFileChange(event: Event): void {
		const target = (<HTMLInputElement>event.target);
		if ( target !== null && target.files !== null && target.files.length > 0) {
			let reader = new FileReader();
			reader.readAsDataURL(target.files[0]);
			reader.onload = () => {
				this.selectedSpecial.img = reader.result as string;
				this.newImage = true;
				(<HTMLInputElement>document.getElementById('add-file')).value = '';
			};
		}
	}
	
	saveEspecial(): void {
		if (this.selectedSpecial.nombre === '') {
			alert('¡No puedes dejar el nombre del especial en blanco!');
			return;
		}
		if (this.mode=='new' && !this.newImage) {
			alert('¡No has elegido ninguna imagen para el especial!');
			return;
		}
		this.as.saveEspecial(this.selectedSpecial.toInterface()).subscribe(result => {
			if (result.status == 'ok') {
				this.closeModal();
				this.loadEspeciales();
				alert('¡Especial guardado!');
			}
			else {
				alert('¡Ocurrió un error al guardar el especial!');
			}
		});
	}
}
