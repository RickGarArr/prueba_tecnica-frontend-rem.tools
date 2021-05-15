import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
// paginas
import { PersonalDataFormComponent } from './pages/personal-data-form/form.component';
import { CameraValidationComponent } from './pages/camera-validation/camera-validation.component';
import { SignaturePageComponent } from './pages/signature-page/signature-page.component';
// componentes
import { ComponentsModule } from './components/components.module';
import { DataService } from './services/data.service';
import { InicioComponent } from './pages/inicio/inicio.component';
// librerias

@NgModule({
  declarations: [
    AppComponent,
    PersonalDataFormComponent,
    CameraValidationComponent,
    SignaturePageComponent,
    InicioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpClientModule,
    ComponentsModule
  ],
  providers: [ DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
