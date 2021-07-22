import { Component, OnInit } from '@angular/core';
import { Jugador } from 'src/app/model/jugador.model';
import { Raza } from 'src/app/model/raza.model';
import { Alianza } from 'src/app/model/alianza.model';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';

@Component({
	selector: 'app-players',
	templateUrl: './players.component.html',
	styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
	jugadores: Jugador[] = [];
	alianzas: Alianza[] = [];
	razas: Raza[] = [];
	boxTitle: string = '';
	showModal: boolean = false;
	selectedPlayer: Jugador = new Jugador();
	selectedRaza: number = -1;
	selectedAlianza: number = -1;

	constructor(private as: ApiService, private cms: ClassMapperService) {}

	ngOnInit(): void {
		this.as.getRazas().subscribe(result => {
			this.razas = this.cms.getRazas(result.list);
			console.log(this.razas);
		});
		this.as.getAlianzas().subscribe(result => {
			this.alianzas = this.cms.getAlianzas(result.list);
			console.log(this.alianzas);
		});

		this.loadJugadores();
	}

	loadJugadores(): void {
		this.as.getJugadores().subscribe(result => {
			this.jugadores = this.cms.getJugadores(result.list);
			console.log(this.jugadores);
		});
	}

	addNew(ev: MouseEvent): void {
		ev && ev.preventDefault();
		this.boxTitle = 'Nuevo jugador';
		this.selectedPlayer = new Jugador(
			-1,
			'',
			new Raza(),
			new Alianza()
		);
		this.selectedRaza = -1;
		this.selectedAlianza = -1;
		this.showModal = true;
	}
	
	closeModal(ev: MouseEvent|null = null): void {
		ev && ev.preventDefault();
		this.showModal = false;
	}
	
	saveJugador(): void {
		if (this.selectedPlayer.nombre === '') {
			alert('¡No puedes dejar el nombre del jugador en blanco!');
			return;
		}
		if (this.selectedRaza === -1) {
			alert('¡Tienes que elegir una raza para el jugador!');
			return;
		}
		else {
			const ind = this.razas.findIndex(x => x.id === this.selectedRaza);
			this.selectedPlayer.raza = this.cms.getRaza(this.razas[ind].toInterface());
		}
		if (this.selectedAlianza !== -1) {
			const ind = this.alianzas.findIndex(x => x.id === this.selectedAlianza);
			this.selectedPlayer.alianza = this.cms.getAlianza(this.alianzas[ind].toInterface());
		}
		else {
			this.selectedPlayer.alianza = new Alianza();
		}
		this.as.saveJugador(this.selectedPlayer.toInterface()).subscribe(result => {
			if (result.status == 'ok') {
				this.closeModal();
				this.loadJugadores();
				alert('¡Jugador guardado!');
			}
			else {
				alert('¡Ocurrió un error al guardar el jugador!');
			}
		});
	}
	
	editJugador(jugador: Jugador): void {
		this.boxTitle = 'Editar jugador';
		this.selectedPlayer = this.cms.getJugador(jugador.toInterface());
		this.selectedRaza = (this.selectedPlayer.raza === null) ? -1 : this.selectedPlayer.raza.id;
		this.selectedAlianza = (this.selectedPlayer.alianza === null) ? -1 : this.selectedPlayer.alianza.id;
		this.showModal = true;
	}
	
	deleteJugador(jugador: Jugador): void {
		const conf = confirm('¿Estás seguro de querer borrar el jugador "' + jugador.nombre + '"?');
		if (conf) {
			this.as.deleteJugador(jugador.id).subscribe(result => {
				if (result.status == 'ok') {
					this.loadJugadores();
					alert('¡Jugador borrado!');
				}
				else {
					alert('¡Ocurrió un error al borrar el jugador!');
				}
			});
		}
	}
}