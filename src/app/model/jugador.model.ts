import { JugadorInterface } from 'src/app/interfaces/interfaces';
import { Raza } from 'src/app/model/raza.model';
import { Alianza } from 'src/app/model/alianza.model';

export class Jugador {
	constructor(
		public id: number = -1,
		public nombre: string = '',
		public raza: Raza | null = null,
		public alianza: Alianza | null = null
	) {}
	
	toInterface(): JugadorInterface {
		return {
			id: this.id,
			nombre: this.nombre,
			raza: (this.raza !== null) ? this.raza.toInterface() : null,
			alianza: (this.alianza !== null) ? this.alianza.toInterface() : null
		};
	}
}