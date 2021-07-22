import { Component, OnInit } from '@angular/core';
import { Planeta } from 'src/app/model/planeta.model';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
	show: boolean = false;
	planeta: Planeta = new Planeta();
	valores: number[] = [-1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

	constructor() {}
	ngOnInit(): void {}

	close(): void {
		this.show = false;
	}
	
	load(planeta: Planeta): void {
		this.show = true;
		this.planeta = planeta;
	}
}