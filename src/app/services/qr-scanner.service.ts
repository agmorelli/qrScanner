import { Injectable } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';

@Injectable({
  providedIn: 'root'
})
export class QrScannerService {

  constructor() { }

   startScan = async () => {

    document.querySelector('body')?.classList.add('barcode-scanner-active');
  
    const listener = await BarcodeScanner.addListener(
      'barcodeScanned',
      async result => {
        console.log(result.barcode);
      },
    );
 
    await BarcodeScanner.startScan();
  };
  

  scanSingleBarcode = async () => {
    return new Promise(async resolve => {
      document.querySelector('body')?.classList.add('barcode-scanner-active');
  
      const listener = await BarcodeScanner.addListener(
        'barcodeScanned',
        async result => {
          await listener.remove();
          document
            .querySelector('body')
            ?.classList.remove('barcode-scanner-active');
          await BarcodeScanner.stopScan();
          resolve(result.barcode);
        },
      );
  
      await BarcodeScanner.startScan();
    });
  };
  
   scan = async () => {
    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });
    return barcodes;
  };
  
   isSupported = async () => {
    const { supported } = await BarcodeScanner.isSupported();
    return supported;
  };

  
   requestPermissions = async () => {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera;
  };
}
