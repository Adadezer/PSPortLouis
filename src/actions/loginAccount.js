require('dotenv').config();

class LoginAccount {
  constructor( page ) {
    this.page = page;
    this.url = "https://www.github.com"
    this.loginBtn = '.HeaderMenu-link--sign-in';
    this.loginBody = '#login';
    this.usernameField = '#login_field';
    this.passwordField = '#password';
    this.loginPageBtn = '.js-sign-in-button';
  }

  async login( username, password ) {
    
    await this.page.goto( this.url );

    await this.page.waitForSelector( this.loginBtn );
    await this.page.click( this.loginBtn );
    await this.page.waitForSelector( this.loginBody );

    await this.page.type( this.usernameField, username );
    await this.page.waitForTimeout( 1000 );
    
    await this.page.type( this.passwordField, password );
    await this.page.waitForTimeout( 1000 );

    await this.page.click( this.loginPageBtn );
    await this.page.waitForTimeout( 1000 );

    if (username !== process.env.EMAIL || password !== process.env.PASSWORD) {
      throw new Error('Autenticação falhou');
    }
    
    await this.page.waitForSelector( '.avatar' );
    await this.page.waitForTimeout( 2000 );

    const userlogin = await this.page.$eval( '.btn-link .css-truncate-target', el => (
      el.textContent.toLowerCase()
    ));

    return userlogin;
  }
}

module.exports = ( page ) => new LoginAccount( page );