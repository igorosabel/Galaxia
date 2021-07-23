import { PlanetaInterface } from 'src/app/interfaces/interfaces';
import { Galaxia } from 'src/app/model/galaxia.model';
import { Jugador } from 'src/app/model/jugador.model';
import { Especial } from 'src/app/model/especial.model';

export class Planeta {
	constructor(
		public id: number = -1,
		public galaxia: Galaxia | null = null,
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
		let nombre = '';
		const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

		// V1A-0201
		// V: primera letra de la galaxia
		nombre += this.galaxia?.nombre.substr(0,1).toUpperCase();
		// 02: numero de sector
		nombre += (this.sector < 10) ? '0' + this.sector : this.sector;
		// A B C D E F G H I  J  K  L  0  1  2  3  4  5  6  7  8  9  M  N  O  P  Q  R  S  T  U  V  W  X  Y
		// 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35
		if (this.sector<36) {
			nombre += chars[this.sector - 1];
		}
		// -
		nombre +=  '-';
		// 02: numero de cuadrante
		nombre += (this.cuadrante < 10) ? '0' + this.cuadrante : this.cuadrante;
		// 01: ind
		const fullInd = this.ind +1;
		nombre += (fullInd < 10) ? '0' + fullInd : fullInd;

		return nombre;
	}
	
	get image() {
		if (this.valor == -1) {
			return '/assets/valor/sinexplo.jpg';
		}
		if (this.especial !== null) {
			return this.especial.img;
		}
		return '/assets/valor/' + this.valor + '.jpg';
	}

	get nombreCompleto() {
		if (this.especial !== null) {
			return this.especial.nombre + '(' + this.nombre + ')';
		}
		return this.nombre;
	}

	toInterface(): PlanetaInterface {
		return {
			id: this.id,
			galaxia: (this.galaxia !== null) ? this.galaxia.toInterface() : null,
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
