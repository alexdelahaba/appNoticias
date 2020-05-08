import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.getNoticiasTematicas(this.categorias[0]);
  }


  cambioCategoria(evento) {
    console.log(evento);
    this.noticias = [];
    this.getNoticiasTematicas(evento.detail.value);
  }

  getNoticiasTematicas(categoria: string, event?) {
    this.noticiasService.getTopHeadlinesCategoria(categoria).subscribe(resp => {
      this.noticias = resp.articles;

      if (event) {
        event.target.complete();
      }

    });
  }



  loadData(evento) {
    console.log(evento);
    this.getNoticiasTematicas(this.segment.value, event);
  }

}
