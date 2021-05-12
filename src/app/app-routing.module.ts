import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CameraValidationComponent } from './pages/camera-validation/camera-validation.component';
import { PersonalDataFormComponent } from './pages/personal-data-form/form.component';
import { SignaturePadComponent } from './pages/signature-pad/signature-pad.component';

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
    component: CameraValidationComponent
  },
  {
    path: 'firma',
    component: SignaturePadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
