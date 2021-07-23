import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Planeta } from 'src/app/model/planeta.model';
import { Jugador } from 'src/app/model/jugador.model';
import { Especial } from 'src/app/model/especial.model';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
	@Output() updateEvent = new EventEmitter<string>();
	show: boolean = false;
	planeta: Planeta = new Planeta();
	valores: number[] = [-1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
	jugadores: Jugador[] = [];
	selectedJugador: number = -1;
	especiales: Especial[] = [];
	selectedEspecial: number = -1;

	constructor(private as: ApiService, private cms: ClassMapperService) {}

	ngOnInit(): void {
		this.as.getJugadores().subscribe(result => {
			this.jugadores = this.cms.getJugadores(result.list);
		});
		this.as.getEspeciales().subscribe(result => {
			this.especiales = this.cms.getEspeciales(result.list);
		});
	}

	close(): void {
		this.show = false;
	}

	load(planeta: Planeta): void {
		this.show = true;
		this.planeta = this.cms.getPlaneta(planeta.toInterface());
		if (this.planeta.jugador !== null) {
			this.selectedJugador = this.planeta.jugador.id;
		}
		else {
			this.selectedJugador = -1;
		}
		if (this.planeta.especial !== null) {
			this.selectedEspecial = this.planeta.especial.id;
		}
		else {
			this.selectedEspecial = -1;
		}
	}
	
	savePlaneta(): void {
		if (this.planeta.valor == -1) {
			alert('¡Tienes que indicar un valor para el planeta!');
			return;
		}
		if (this.selectedJugador !== -1) {
			const ind = this.jugadores.findIndex(x => x.id === this.selectedJugador);
			this.planeta.jugador = this.cms.getJugador(this.jugadores[ind].toInterface());
		}
		else {
			this.planeta.jugador = null;
		}
		if (this.selectedEspecial !== -1) {
			const ind = this.especiales.findIndex(x => x.id === this.selectedEspecial);
			this.planeta.especial = this.cms.getEspecial(this.especiales[ind].toInterface());
		}
		else {
			this.planeta.especial = null;
		}
		this.as.savePlaneta(this.planeta.toInterface()).subscribe(result => {
			if (result.status == 'ok') {
				this.close();
				this.updateEvent.emit(result.status);
			}
			else {
				alert('¡Ocurrió un error al actualizar el planeta!');
			}
		});
	}
}