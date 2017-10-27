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

			//Intentamos el login silencioso de google
			this.googlePlus.trySilentLogin({})
			.then(user => {

				//this.doLoginInServerByGoogle (user);

			})
			.catch(err => {
				this.presentToastLoginError();
			});

		})
		.catch(err => {
			console.log("err", err);
		})
	}

	// Accion del boton login by google del html
	doLoginByGoogle() {

		this.googlePlus.login({})
		.then(user => {
			this.doLoginInServerByGoogle (user);
		})
		.catch(err => {
			this.presentToastLoginError();
		});

	}

	// Usa el servicio para hacer login
	doLoginInServerByGoogle (googleUser): void {

		this.user.loginByGoogle(googleUser)
		.subscribe((res: any) => {

			if (res.token) {
				console.log(res.token);
				this.navCtrl.push(MainPage);
			} else {
				this.presentToastLoginError();
			}

		}, err => {
			console.error(err);
			this.presentToastLoginError();
		})

	}

	// Mensaje de error al ejecutar el login
	presentToastLoginError (): void {

		let toast = this.toastCtrl.create({
			message: this.loginErrorString,
			duration: 3000,
			position: 'top'
		});
		toast.present();

	}
}
