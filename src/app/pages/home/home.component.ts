import { Component, OnInit } from '@angular/core';
import { Galaxia } from 'src/app/model/galaxia.model';
import { Planeta } from 'src/app/model/planeta.model';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';
import { environment } from 'src/environments/environment';
import { Location } from 'src/app/interfaces/interfaces';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	galaxias: Galaxia[] = [];
	selected: Location = environment.inicio;
	numSectores = 0;
	numCuadrantes = 0;
	numPlanetas = 0;
	planetas: Planeta[] = [];

	constructor(private as: ApiService, private cms: ClassMapperService) {}

	ngOnInit(): void {
		this.as.getGalaxias().subscribe(result => {
			this.galaxias = this.cms.getGalaxias(result.list);
			this.loadSelected();
		});
	}

	loadSelected(): void {
		let selectedGalaxia = this.galaxias.findIndex(x => x.id === this.selected.galaxia);
		this.numSectores = this.galaxias[selectedGalaxia].sectores;
		this.numCuadrantes = this.galaxias[selectedGalaxia].cuadrantes;
		this.numPlanetas = this.galaxias[selectedGalaxia].planetas;
		if (this.selected.sector > this.numSectores) {
			this.selected.sector = 1;
		}
		if (this.selected.cuadrante > this.numCuadrantes) {
			this.selected.cuadrante = 1;
		}
		this.as.getPlanetas(this.selected).subscribe(result => {
			const planetList = this.cms.getPlanetas(result.list);
			this.planetas = [];

			for (let i = 0; i < this.numPlanetas; i++) {
				let ind = planetList.findIndex(x => x.ind===i);
				if (ind != -1) {
					this.planetas[i] = planetList[ind];
				}
				else {
					this.planetas[i] = new Planeta(
						-1,
						this.selected.sector,
						this.selected.cuadrante,
						i
					);
				}
			}

			console.log(this.planetas);
		});
	}
	
	counter(i: number) {
		return new Array(i);
	}
}