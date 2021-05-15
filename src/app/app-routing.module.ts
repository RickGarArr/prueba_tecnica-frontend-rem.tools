import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesGuard } from './guards/guards.guard';
import { CameraValidationComponent } from './pages/camera-validation/camera-validation.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PersonalDataFormComponent } from './pages/personal-data-form/form.component';
import { SignaturePageComponent } from './pages/signature-page/signature-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'formulario',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'formulario',
    component: PersonalDataFormComponent,
    canActivate: [ PagesGuard ]
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
