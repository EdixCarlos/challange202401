import { HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import {importProvidersFrom} from "@angular/core";

export const routes: Routes = [
  {
    path
      : 'registro',
    component: RegistroComponent,
    providers: [importProvidersFrom(HttpClientModule)]
  },
];
