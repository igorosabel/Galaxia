import { EspecialInterface } from 'src/app/interfaces/interfaces';

export class Especial {
	constructor(
		public id: number = -1,
		public nombre: string = ''
	) {}
	
	toInterface(): EspecialInterface {
		return {
			id: this.id,
			nombre: this.nombre
		};
	}
}