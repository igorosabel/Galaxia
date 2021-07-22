/*
 * Páginas
 */
import { HomeComponent } from 'src/app/pages/home/home.component';
import { PlayersComponent } from './pages/players/players.component';
import { AlliancesComponent } from './pages/alliances/alliances.component';
import { SpecialsComponent } from './pages/specials/specials.component';

export const PAGES: any[] = [
	HomeComponent,
	PlayersComponent,
	AlliancesComponent,
	SpecialsComponent
];

/*
 * Componentes parciales
 */
import { DetailComponent } from 'src/app/components/detail/detail.component';

export const COMPONENTS: any[] = [
	DetailComponent
];

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
