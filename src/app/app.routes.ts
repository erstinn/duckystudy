import { Routes } from '@angular/router';
import { CardsPageComponent } from './features/cards/pages/cards-page.component';
import { SettingsPageComponent } from './features/settings/pages/settings-page.component';
import { StudyPageComponent } from './features/study/pages/study-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'study' },
  { path: 'study', component: StudyPageComponent },
  { path: 'cards', component: CardsPageComponent },
  { path: 'settings', component: SettingsPageComponent },
];
