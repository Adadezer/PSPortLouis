// const chalk = require( 'chalk' );

class PerfilPage {
  constructor( page, email ) {
    this.page = page;
    const username = email.split('@')[0];
    this.urlPerfil = `https://www.github.com/${username}`
    this.avatarUser = '.avatar-user';
    this.cardNamePerfil = '.vcard-fullname';
    this.cardNameLogin = '.vcard-username';
  }

  async perfil() {
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

    return { userperfil, userlogin };
  }
}

module.exports = ( page, email ) => new PerfilPage( page, email );