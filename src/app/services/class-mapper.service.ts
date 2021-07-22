import { Injectable } from '@angular/core';
import { Raza } from 'src/app/model/raza.model';
import { Alianza } from 'src/app/model/alianza.model';
import { Jugador } from 'src/app/model/jugador.model';
import { Especial } from 'src/app/model/especial.model';
import { Galaxia } from 'src/app/model/galaxia.model';
import { Planeta } from 'src/app/model/planeta.model';
import {
	RazaInterface,
	AlianzaInterface,
	JugadorInterface,
	EspecialInterface,
	GalaxiaInterface,
	PlanetaInterface
} from 'src/app/interfaces/interfaces';
import { Utils } from 'src/app/model/utils.class';

@Injectable({
	providedIn: 'root'
})
export class ClassMapperService {
	constructor() {}

	getRazas(rs: RazaInterface[]): Raza[] {
		const razas: Raza[] = [];

		for (let r of rs) {
			razas.push(this.getRaza(r));
		}

		return razas;
	}

	getRaza(r: RazaInterface): Raza {
		return new Raza(
			r.id,
			Utils.urldecode(r.nombre)
		);
	}

	getAlianzas(as: AlianzaInterface[]): Alianza[] {
		const alianzas: Alianza[] = [];

		for (let a of as) {
			alianzas.push(this.getAlianza(a));
		}

		return alianzas;
	}

	getAlianza(a: AlianzaInterface): Alianza {
		return new Alianza(
			a.id,
			Utils.urldecode(a.nombre)
		);
	}

	getJugadores(js: JugadorInterface[]): Jugador[] {
		const jugadores: Jugador[] = [];

		for (let j of js) {
			jugadores.push(this.getJugador(j));
		}

		return jugadores;
	}

	getJugador(j: JugadorInterface): Jugador {
		return new Jugador(
			j.id,
			Utils.urldecode(j.nombre),
			(j.raza !== null) ? this.getRaza(j.raza) : null,
			(j.alianza !== null) ? this.getAlianza(j.alianza) : null
		);
	}

	getEspeciales(es: EspecialInterface[]): Especial[] {
		const especiales: Especial[] = [];

		for (let e of es) {
			especiales.push(this.getEspecial(e));
		}

		return especiales;
	}

	getEspecial(e: EspecialInterface): Especial {
		return new Especial(
			e.id,
			Utils.urldecode(e.nombre)
		);
	}

	getGalaxia(g: GalaxiaInterface): Galaxia {
		return new Galaxia(
			g.id,
			Utils.urldecode(g.nombre),
			g.sectores,
			g.cuadrantes,
			g.planetas,
			g.num,
			g.investigados
		);
	}

	getGalaxias(gs: GalaxiaInterface[]): Galaxia[] {
		const galaxias: Galaxia[] = [];

		for (let g of gs) {
			galaxias.push(this.getGalaxia(g));
		}

		return galaxias;
	}

	getPlaneta(p: PlanetaInterface): Planeta {
		return new Planeta(
			p.id,
			(p.galaxia !== null) ? this.getGalaxia(p.galaxia) : null,
			p.sector,
			p.cuadrante,
			p.ind,
			Utils.urldecode(p.nombre),
			p.valor,
			(p.jugador !== null) ? this.getJugador(p.jugador) : null,
			(p.especial !== null) ? this.getEspecial(p.especial) : null,
			p.protegido
		);
	}

	getPlanetas(ps: PlanetaInterface[]): Planeta[] {
		const planetas: Planeta[] = [];

		for (let p of ps) {
			planetas.push(this.getPlaneta(p));
		}

		return planetas;
	}
}
