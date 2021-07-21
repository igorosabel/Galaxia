import { AlianzaInterface } from 'src/app/interfaces/interfaces';

export class Alianza {
	constructor(
		public id: number = -1,
		public nombre: string = ''
	) {}
	
	toInterface(): AlianzaInterface {
		return {
			id: this.id,
			nombre: this.nombre
		};
	}
}