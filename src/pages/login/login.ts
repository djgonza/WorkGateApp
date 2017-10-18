import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	// The account fields for the login form.
	// If you're using the username field with or without email, make
	// sure to add it to the type
	account: { email: string, password: string } = {
		email: 'test@example.com',
		password: 'test'
	};

	// Our translated text strings
	private loginErrorString: string;

	constructor(public navCtrl: NavController,
		public user: User,
		public toastCtrl: ToastController,
		public translateService: TranslateService,
		private googlePlus: GooglePlus,
		public platform: Platform) {

		this.translateService.get('LOGIN_ERROR').subscribe((value) => {
			this.loginErrorString = value;
		})

		this.platform.ready()
		.then(() => {
			console.log("Ready!!!!!");
			this.googlePlus.trySilentLogin({})
			.then(user => {
				console.log("user", JSON.stringify(user));
			})
			.catch(err => {
				console.log("err", err);
			});
		})
		.catch(err => {
			console.log("err", err);
		})
	}

	// Attempt to login in through our User service
	doLogin() {

		console.log("Do Login By Google");

		this.googlePlus.login({})
		.then(user => {
			console.log("user", user);
		})
		.catch(err => {
			console.log("err", err);
		});

		/*this.user.login(this.account).subscribe((resp) => {
		  this.navCtrl.push(MainPage);
		}, (err) => {
		  this.navCtrl.push(MainPage);
		  // Unable to log in
		  let toast = this.toastCtrl.create({
			message: this.loginErrorString,
			duration: 3000,
			position: 'top'
		  });
		  toast.present();
		});*/
	}
}
