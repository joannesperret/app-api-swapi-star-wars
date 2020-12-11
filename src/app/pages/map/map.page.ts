import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, circle } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx'


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  private map: Map;

  constructor(private geolocation: Geolocation) {
    
   }

  ngOnInit() {
  }

  ionViewDidEnter(){
    
    this.geolocation.getCurrentPosition()
    .then(response =>{ 
      const coords = [response.coords.latitude, response.coords.longitude]
      this.initMap(coords);

    //this.initMap(position.coords);
    });
  }

  initMap(coords){
   // Instanciation de la carte
   this.map = new Map('mapView');
   // Deuxième paramètre correspond au zoom
   this.map.setView(coords, 5);
   tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map); 

  // Ajout d'un marqueur

 circle(coords,{color: 'green', radius: 160}).addTo(this.map)
 .bindPopup('<p>Vous êtes ici!</p>');
  
}

   
}
