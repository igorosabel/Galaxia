import { PlanetaInterface } from 'src/app/interfaces/interfaces';
import { Jugador } from 'src/app/model/jugador.model';
import { Especial } from 'src/app/model/especial.model';

export class Planeta {
	constructor(
		public id: number = -1,
		public sector: number = -1,
		public cuadrante: number = -1,
		public ind: number = -1,
		public nombre: string = '',
		public valor: number = -1,
		public jugador: Jugador | null = null,
		public especial: Especial | null = null,
		public protegido: boolean = false
	) {
		if (this.nombre == '') {
			this.nombre = this.getDefaultName();
		}
	}
	
	getDefaultName(): string {
		// V1A-0201
		// V: primera letra de la galaxia
		//
		// -
		// 02: numero de cuadrante
		// 01: ind
		return '';
	}
	
	toInterface(): PlanetaInterface {
		return {
			id: this.id,
			sector: this.sector,
			cuadrante: this.cuadrante,
			ind: this.ind,
			nombre: this.nombre,
			valor: this.valor,
			jugador: (this.jugador !== null) ? this.jugador.toInterface() : null,
			especial: (this.especial !== null) ? this.especial.toInterface() : null,
			protegido: this.protegido
		};
	}
}