import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { PlayersComponent } from './pages/players/players.component';
import { AlliancesComponent } from './pages/alliances/alliances.component';
import { SpecialsComponent } from './pages/specials/specials.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'players', component: PlayersComponent },
	{ path: 'alliances', component: AlliancesComponent },
	{ path: 'specials', component: SpecialsComponent },
	{ path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
