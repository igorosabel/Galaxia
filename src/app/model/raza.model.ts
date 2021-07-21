import { RazaInterface } from 'src/app/interfaces/interfaces';

export class Raza {
	constructor(
		public id: number = -1,
		public nombre: string = ''
	) {}
	
	toInterface(): RazaInterface {
		return {
			id: this.id,
			nombre: this.nombre
		};
	}
}