/*
 * Páginas
 */
import { HomeComponent } from 'src/app/pages/home/home.component';

export const PAGES: any[] = [
	HomeComponent
];

/*
 * Componentes parciales
 */
export const COMPONENTS: any[] = [];

/*
 * Pipes
 */
export const PIPES: any[] = [];

/*
 * Servicios
 */
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from './services/class-mapper.service';

export const SERVICES: any[] = [
	ApiService,
	ClassMapperService
];