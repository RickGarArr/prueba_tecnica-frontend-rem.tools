import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PagesGuard } from './guards/guards.guard';
import { CameraValidationComponent } from './pages/camera-validation/camera-validation.component';
import { PersonalDataFormComponent } from './pages/personal-data-form/form.component';
import { SignaturePageComponent } from './pages/signature-pad/signature-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'formulario',
    pathMatch: 'full'
  },
  {
    path: 'formulario',
    component: PersonalDataFormComponent
  },
  {
    path: 'camara',
    component: CameraValidationComponent,
    canActivate: [ PagesGuard ]
  },
  {
    path: 'firma',
    component: SignaturePageComponent,
    canActivate: [ PagesGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
