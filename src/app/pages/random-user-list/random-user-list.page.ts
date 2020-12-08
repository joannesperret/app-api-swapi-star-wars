import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

// adresse de l' API à laquelle on veut se connecter
const URL ='https://randomuser.me/api?results=10';

@Component({
  selector: 'app-random-user-list',
  templateUrl: './random-user-list.page.html',
  styleUrls: ['./random-user-list.page.scss'],
})
export class RandomUserListPage implements OnInit {

  // injection d'une instance d' HttpClient dans le constructeur
  // stockée dans une variable nommée http

  public userList = [];

  constructor(private http: HttpClient){ }

  ngOnInit() {
    this.loadUsers(null);
  }

  public loadUsers(even){
    // Requête HTTP, la méthode get retourne un observable
    this.http.get(URL)
    // l'observable est résolu par la méthode subscribe
    .subscribe(
      // fonction callback de succès
      (response: any) => {
      console.log(response);
      this.userList = this.userList.concat(response.results);
      console.log(this.userList);
      if (even){
        even.target.complete();
      }

    });
  }

}
