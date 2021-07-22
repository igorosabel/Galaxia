import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
	Location,
	GalaxiasResult,
	PlanetasResult,
	AlianzasResult,
	AlianzaInterface,
	StatusResult
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

	getAlianzas(): Observable<AlianzasResult> {
		return this.http.post<AlianzasResult>(this.apiUrl + 'get-alianzas', {});
	}
	
	saveAlianza(alianza: AlianzaInterface): Observable<StatusResult> {
		return this.http.post<StatusResult>(this.apiUrl + 'save-alianza', alianza);
	}
	
	deleteAlianza(id: number): Observable<StatusResult> {
		return this.http.post<StatusResult>(this.apiUrl + 'delete-alianza', {id});
	}
}
