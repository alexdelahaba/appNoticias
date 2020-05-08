import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() item: Article;
  @Input() indice: number;
  @Input() enFavoritos = false;

  constructor(
    private iab: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing, private dataLocalService: DataLocalService) { }

  ngOnInit() { }


  abrirNoticia() {
    this.iab.create(this.item.url, '_system');
  }

  async lanzarMenu() {
    let guardarBorrarBtn;

    if (this.enFavoritos) {

      guardarBorrarBtn = {
        text: 'Delete favorite',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Play clicked');
          this.dataLocalService.borrarNoticia(this.item);
        }
      }

    } else {

      guardarBorrarBtn = {
        text: 'Favorite',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Play clicked');
          this.dataLocalService.guardarNoticia(this.item);
        }
      }

    }

    const actionSheet = await this.actionSheetController.create({

      buttons: [{
        text: 'Share',
        icon: 'share-social',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.item.title,
            this.item.source.name,
            '',
            this.item.url
          );
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
        guardarBorrarBtn]
    });
    await actionSheet.present();


  }
}
