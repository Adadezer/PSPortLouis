const chalk = require( 'chalk' );

class PerfilPage {
  constructor( page, username ) {
    this.urlPerfil = `https://www.github.com/${username}`
    this.page = page;
    this.avatarUser = ".avatar-user"
  }

  async perfil() {
    try {
      await this.page.goto( this.urlPerfil );

      await this.page.waitForSelector( this.avatarUser );
      await this.page.waitForTimeout( 1000 );

      const username =  await this.page.$eval('.vcard-username', el => (
        el.textContent.replace(".", "").trim().toLowerCase()
      ));

      return username;
    } catch ( err ) {
      console.log( chalk.red( 'ERROR => ', err ) );
    }
  }
}

module.exports = ( page, username ) => new PerfilPage( page, username );