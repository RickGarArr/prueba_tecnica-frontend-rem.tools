import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
// paginas
import { PersonalDataFormComponent } from './pages/personal-data-form/form.component';
import { CameraValidationComponent } from './pages/camera-validation/camera-validation.component';
import { SignaturePageComponent } from './pages/signature-pad/signature-page.component';
// componentes
import { ComponentsModule } from './components/components.module';
import { DataService } from './services/data.service';
// librerias

@NgModule({
  declarations: [
    AppComponent,
    PersonalDataFormComponent,
    CameraValidationComponent,
    SignaturePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule
  ],
  providers: [ DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
