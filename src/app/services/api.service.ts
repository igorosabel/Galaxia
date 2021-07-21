import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
	Location,
	GalaxiasResult,
	PlanetasResult
} from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	apiUrl = environment.apiUrl;

	constructor(private http: HttpClient) {}

	getGalaxias(): Observable<GalaxiasResult> {
		return this.http.post<GalaxiasResult>(this.apiUrl + 'get-galaxias', {});
	}

	getPlanetas(location: Location): Observable<PlanetasResult> {
		return this.http.post<PlanetasResult>(this.apiUrl + 'get-planetas', location);
	}
}
