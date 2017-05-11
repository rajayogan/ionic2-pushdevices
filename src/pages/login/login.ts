import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { HomePage } from '../home/home';

import firebase from 'firebase';
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  username: any;
  password: any;
  constructor(public navCtr: NavController, public navParams: NavParams, afd: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  signin() {
    firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(() => {
      this.navCtr.setRoot(HomePage);
    }).catch((err) => {
      alert('Login failed' + err);
    })
  }

}
