import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})


export class PhotoService {
  public photos: Photo[] = [];
  constructor(private camera: Camera, private storage: Storage) { };

  takePicture() {

    let appRoot = document.getElementsByTagName("app-root")[0];

    
    //appRoot.style.opacity = 0.5;
    appRoot.setAttribute("style","opacity:0.5;");


    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    /*
    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log("Camera issue:" + err);
    });
    *
    this.camera.getPicture(options).then((imageData) => {
        // Add new photo to gallery
        appRoot.setAttribute("style","opacity:1;");
        this.photos.unshift({
            data: 'data:image/jpeg;base64,' + imageData
        }); }, (err) => {
        // Handle error
        appRoot.setAttribute("style","opacity:1;");
        console.log("Camera issue: " + err);
    });  
    
    */

    this.camera.getPicture(options).then((imageData) => {
      // Add new photo to gallery
      appRoot.setAttribute("style","opacity:1;");
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageData
      });
    
      // Save all photos for later viewing
      this.storage.set('photos', this.photos);
    }, (err) => {
      // Handle error
      appRoot.setAttribute("style","opacity:1;");
      console.log("Camera issue: " + err);
    });    

  }  

  loadSaved() {
    this.storage.get('photos').then((photos) => {
      this.photos = photos || [];
    });
  }

}



class Photo {
  data: any;
}

