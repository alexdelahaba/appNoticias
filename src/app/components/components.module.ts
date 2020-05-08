import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NoticiaComponent } from './noticia/noticia.component';
import { NoticiasComponent } from './noticias/noticias.component';



@NgModule({
  declarations: [
    NoticiaComponent,
    NoticiasComponent
  ],
  exports: [NoticiasComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
