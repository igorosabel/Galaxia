import { Component, OnInit } from '@angular/core';
import { Alianza } from 'src/app/model/alianza.model';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';

@Component({
	selector: 'app-alliances',
	templateUrl: './alliances.component.html',
	styleUrls: ['./alliances.component.scss']
})
export class AlliancesComponent implements OnInit {
	alianzas: Alianza[] = [];
	boxTitle: string = '';
	showModal: boolean = false;
	selectedAlliance: Alianza = new Alianza();

	constructor(private as: ApiService, private cms: ClassMapperService) {}

	ngOnInit(): void {
		this.loadAlianzas();
	}
	
	loadAlianzas(): void {
		this.as.getAlianzas().subscribe(result => {
			this.alianzas = this.cms.getAlianzas(result.list);
		});
	}
	
	addNew(ev: MouseEvent): void {
		ev && ev.preventDefault();
		this.boxTitle = 'Nueva alianza';
		this.selectedAlliance = new Alianza();
		this.showModal = true;
	}
	
	closeModal(ev: MouseEvent|null = null): void {
		ev && ev.preventDefault();
		this.showModal = false;
	}
	
	saveAlianza(): void {
		if (this.selectedAlliance.nombre === '') {
			alert('¡No puedes dejar el nombre de la alianza en blanco!');
		}
		else {
			this.as.saveAlianza(this.selectedAlliance.toInterface()).subscribe(result => {
				if (result.status == 'ok') {
					this.closeModal();
					this.loadAlianzas();
					alert('¡Alianza guardada!');
				}
				else {
					alert('¡Ocurrió un error al guardar la alianza!');
				}
			});
		}
	}
	
	editAlianza(alianza: Alianza): void {
		this.boxTitle = 'Editar alianza';
		this.selectedAlliance = this.cms.getAlianza(alianza.toInterface());
		this.showModal = true;
	}
	
	deleteAlianza(alianza: Alianza): void {
		const conf = confirm('¿Estás seguro de querer borrar la alianza "' + alianza.nombre + '"?');
		if (conf) {
			this.as.deleteAlianza(alianza.id).subscribe(result => {
				if (result.status == 'ok') {
					this.loadAlianzas();
					alert('¡Alianza borrada!');
				}
				else {
					alert('¡Ocurrió un error al borrar la alianza!');
				}
			});
		}
	}
}