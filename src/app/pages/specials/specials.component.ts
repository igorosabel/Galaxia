import { Component, OnInit } from '@angular/core';
import { Especial } from 'src/app/model/especial.model';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service'

@Component({
	selector: 'app-specials',
	templateUrl: './specials.component.html',
	styleUrls: ['./specials.component.scss']
})
export class SpecialsComponent implements OnInit {
	especiales: Especial[] = [];

	constructor(private as: ApiService, private cms: ClassMapperService) {}

	ngOnInit(): void {
		this.loadEspeciales();
	}

	loadEspeciales(): void {
		this.as.getEspeciales().subscribe(result => {
			this.especiales = this.cms.getEspeciales(result.list);
			console.log(this.especiales);
		});
	}

	addNew(ev: MouseEvent): void {

	}
}
