const chalk = require( 'chalk' );

class PerfilPage {
  constructor( page, username ) {
    this.urlPerfil = `https://www.github.com/${username}`
    this.page = page;
    this.avatarUser = '.avatar-user';
    this.cardNamePerfil = '.vcard-fullname';
    this.cardNameLogin = '.vcard-username';
  }

  async perfil() {
    try {
      await this.page.goto( this.urlPerfil );

      await this.page.waitForSelector( this.avatarUser );
      await this.page.waitForTimeout( 1000 );

      const userperfil = await this.page.$eval(this.cardNamePerfil, el => (
        el.textContent.replace(".", "").trim().toLowerCase()
      ));

      await this.page.waitForTimeout( 1000 );

      const userlogin =  await this.page.$eval(this.cardNameLogin, el => (
        el.textContent.replace(".", "").trim().toLowerCase()
      ));

      return {userperfil, userlogin};

    } catch ( err ) {
      console.log( chalk.red( 'ERROR => ', err ) );
    }
  }
}

module.exports = ( page, username ) => new PerfilPage( page, username );