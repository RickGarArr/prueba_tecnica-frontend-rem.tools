import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
// paginas
import { PersonalDataFormComponent } from './pages/personal-data-form/form.component';
import { CameraValidationComponent } from './pages/camera-validation/camera-validation.component';
import { SignaturePadComponent } from './pages/signature-pad/signature-pad.component';
// componentes
import { ComponentsModule } from './components/components.module';
// librerias

@NgModule({
  declarations: [
    AppComponent,
    PersonalDataFormComponent,
    CameraValidationComponent,
    SignaturePadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
