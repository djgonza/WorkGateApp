import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

/**
* 
*/
@Injectable()
export class User {
	
	_user: any;
	_token: string;

	constructor(public api: Api) { }


	/**
	* Intenta el login con google y recive un token
	*/

	loginByGoogle (googleUser) {

		let seq = this.api.post('authenticate/bygoogle', googleUser).share();

		seq
		.subscribe((res: any) => {

			if (res.token){
				this._token = res.token;
			}

		}, err => {
			console.error(JSON.stringify(err));
		})

		return seq;

	}

	  /**
	   * Send a POST request to our login endpoint with the data
	   * the user entered on the form.
	   */
	   login(accountInfo: any) {
		let seq = this.api.post('login', accountInfo).share();

		seq.subscribe((res: any) => {
			// If the API returned a successful response, mark the user as logged in
			if (res.status == 'success') {
				this._loggedIn(res);
			} else {
			}
		}, err => {
			console.error('ERROR', err);
		});

		return seq;
	   }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
   signup(accountInfo: any) {
	let seq = this.api.post('signup', accountInfo).share();

	seq.subscribe((res: any) => {
		// If the API returned a successful response, mark the user as logged in
		if (res.status == 'success') {
			this._loggedIn(res);
		}
	}, err => {
		console.error('ERROR', err);
	});

	return seq;
   }

  /**
   * Log the user out, which forgets the session
   */
   logout() {
	this._user = null;
   }

  /**
   * Process a login/signup response to store user data
   */
   _loggedIn(resp) {
	this._user = resp.user;
   }


	ping () {
		
		let seq = this.api.get('ping').share();

		seq
		.map(res => JSON.stringify(res))
		.subscribe(res => {
			console.log("res", res)
		}, err => {
			console.log('err', err);
		});

		return seq;

	}

}
