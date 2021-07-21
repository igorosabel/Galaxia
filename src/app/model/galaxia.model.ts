import { GalaxiaInterface } from 'src/app/interfaces/interfaces';

export class Galaxia {
	constructor(
		public id: number = -1,
		public nombre: string = '',
		public sectores: number = -1,
		public cuadrantes: number = -1,
		public planetas: number = -1,
		public num: number = -1,
		public investigados: number = -1
	) {}
	
	toInterface(): GalaxiaInterface {
		return {
			id: this.id,
			nombre: this.nombre,
			sectores: this.sectores,
			cuadrantes: this.cuadrantes,
			planetas: this.planetas,
			num: this.num,
			investigados: this.investigados
		};
	}
}