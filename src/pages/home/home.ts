import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import firebase from 'firebase';

declare var FCMPlugin;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  firestore = firebase.database().ref('/pushtokens');
  firemsg = firebase.database().ref('/messages');
  constructor(public navCtrl: NavController, public afd: AngularFireDatabase) {
    this.tokensetup().then((token) => {
      this.storetoken(token);
    })
  }

  ionViewDidLoad() {
    FCMPlugin.onNotification(function(data){
    if(data.wasTapped){
      //Notification was received on device tray and tapped by the user.
      alert( JSON.stringify(data) );
    }else{
      //Notification was received in foreground. Maybe the user needs to be notified.
      alert( JSON.stringify(data) );
    }
    });

FCMPlugin.onTokenRefresh(function(token){
    alert( token );
});    
  }

  tokensetup() {
    var promise = new Promise((resolve, reject) => {
      FCMPlugin.getToken(function(token){
    resolve(token);
      }, (err) => {
        reject(err);
});
    })
    return promise;
  }

  storetoken(t) {
    this.afd.list(this.firestore).push({
      uid: firebase.auth().currentUser.uid,
      devtoken: t
        
    }).then(() => {
      alert('Token stored');
      }).catch(() => {
        alert('Token not stored');
      })

    this.afd.list(this.firemsg).push({
      sendername: 'vincent',
      message: 'hello'
    }).then(() => {
      alert('Message stored');
      }).catch(() => {
        alert('Message not stored');
  })  
}

}
