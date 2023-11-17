import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { QrScannerService } from '../services/qr-scanner.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {

  isSupported = false;
  barcodes: Barcode[] = [];
  respuesta: any;

  constructor(private alertController: AlertController, private scannerService: QrScannerService) {}

  ngOnInit() {
    this.scannerService.isSupported().then((result) => {
      this.isSupported = result;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.scannerService.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

  this.respuesta = await this.scannerService.scanSingleBarcode();
    
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
