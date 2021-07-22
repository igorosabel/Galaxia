export interface Location {
	galaxia: number;
	sector: number;
	cuadrante: number;
}

export interface RazaInterface {
	id: number;
	nombre: string;
}

export interface AlianzaInterface {
	id: number;
	nombre: string;
}

export interface JugadorInterface {
	id: number;
	nombre: string;
	raza: RazaInterface | null;
	alianza: AlianzaInterface | null;
}

export interface EspecialInterface {
	id: number;
	nombre: string;
}

export interface GalaxiaInterface {
	id: number;
	nombre: string;
	sectores: number;
	cuadrantes: number;
	planetas: number;
	num: number;
	investigados: number;
}

export interface PlanetaInterface {
	id: number;
	galaxia: GalaxiaInterface | null;
	sector: number;
	cuadrante: number;
	ind: number;
	nombre: string;
	valor: number;
	jugador: JugadorInterface | null;
	especial: EspecialInterface | null;
	protegido: boolean;
}

export interface GalaxiasResult {
	status: string;
	list: GalaxiaInterface[];
}

export interface PlanetasResult {
	status: string;
	list: PlanetaInterface[];
}

export interface AlianzasResult {
	status: string;
	list: AlianzaInterface[];
}

export interface StatusResult {
	status: string;
}

export interface RazasResult {
	status: string;
	list: RazaInterface[];
}

export interface JugadoresResult {
	status: string;
	list: JugadorInterface[];
}

export interface EspecialesResult {
	status: string;
	list: EspecialInterface[];
}
