import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { URL } from '../sw-personnages/sw-personnages.page';



@Component({
  selector: 'app-sw-details',
  templateUrl: './sw-details.page.html',
  styleUrls: ['./sw-details.page.scss'],
})

export class SwDetailsPage implements OnInit {

  public character = {name: null, mass: null, height: null, eye_color: null, hair_color: null, films: []
  };

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    // Récupération de l'id du personnage passé en paramètre
    const id = this.route.snapshot.paramMap.get('id');
    this.loadCharacter(id);
  }

  private loadCharacter(id){
    const detailUrl = URL + id;
    this.http.get(detailUrl).subscribe((response: any) => {
      console.log(response);
      this.character = response;
    });
  }

}
