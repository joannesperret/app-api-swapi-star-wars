import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, circle } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  private map: Map;

  public pmrRoubaix = { emplacements: [] };
  public pmrList = {};
  public pmrLocalisation = [];

  // API paramétrée pour appel des 797 emplacements
  public UrlPmrRoubaix = 'https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=les-emplacements-de-stationnement-pmr-a-roubaix&q=&rows=797';
  public coords = [];
  constructor(private geolocation: Geolocation, private http: HttpClient) {

  }

  ngOnInit() {
    // Fonction d'appel de l' API de geolocalisation des emplacements PMR à Roubaix
    this.loadPmrRoubaix(this.UrlPmrRoubaix);

    // .then( toast => toast.present());
  }

  // Fonction d' appel à l' API pour ajout des emplacements PMR Roubaisiens sur la carte

  public loadPmrRoubaix(dataUrl) {
    // Requête HTTP, la méthode get retourne un observable   

    this.http.get(dataUrl)
      // l'observable est résolu par la méthode subscribe
      .subscribe(
        // fonction callback de succès
        (response: any) => {
          // console.log(response);
          this.pmrList = response.records;
          console.log("Promesse");
          // boucle d'ajout de cercle sur chaque coordonnée d'emplacement PMR 
          //this.initMap(position.coords);             
          for (let i = 0; i < 796; i++) {
            //circle([this.pmrList[i].fields.geo_point_2d],{color: 'blue', radius: 50}).addTo(this.map)
            //.bindPopup('<p>Emplacement PMR</p>');  

            //console.log([this.pmrList[i].fields.geo_point_2d]); 
            this.pmrLocalisation.push(this.pmrList[i].fields.geo_point_2d);
            // console.log(this.pmrLocalisation);
          //  circle([this.pmrList[i].fields.geo_point_2d],{color: 'blue', radius: 50}).addTo(this.map)
           // .bindPopup('<p>Emplacement PMR</p>');  

            //Envoi d’un message pour indiquer la fin du chargement


          }
          console.log("Résolue");

          this.initMap(this.coords);

      
        

        });
  }



  ionViewDidEnter() {
    this.geolocation.getCurrentPosition()
      .then(response => {
        this.coords = [response.coords.latitude, response.coords.longitude]       
      });
  }


  initMap(coords) {
    // Instanciation de la carte
    this.map = new Map('mapView');
    // Deuxième paramètre correspond au zoom
    this.map.setView(coords, 16);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);

    // Ajout d'un marqueur

    circle(coords, { color: 'green', radius: 10 }).addTo(this.map)
      .bindPopup('<p>Vous êtes ici!</p>');

    // 
    // Test
    // Ajout d'un marqueur PMR sur le 111 rue d' Isly
    // coordonnées: [50.6857071369, 3.16269155713]
    //

    circle([50.6857071369, 3.16269155713], { color: 'blue', radius: 50 }).addTo(this.map)
      .bindPopup('<p>Emplacement PMR</p>');

     for (let i = 0; i < 797; i++) {
      circle(this.pmrList[i].fields.geo_point_2d,{color: 'blue', radius: 5}).addTo(this.map)
      .bindPopup('<p>Emplacement PMR</p>'); 
     // console.log(this.pmrList[0].fields.geo_point_2d);
    }


  }

}



