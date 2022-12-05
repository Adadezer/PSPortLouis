class PerfilPageError {
  constructor( page, email ) {
    this.page = page;
    const username = email.split('@')[0];
    this.urlPerfil = `https://www.github.com/${username}`;
    this.avatarUserError = '.avatar-user-error';
    this.cardNameLogin = '.vcard-username';
  }

  async perfilError() {
    await this.page.goto( this.urlPerfil );

    let userLoginError = '';
    if ((await this.page.$(this.avatarUserError)) !== null) {
      userLoginError = await this.page.$eval(this.cardNameLogin, el => (
        el.textContent.replace(".", "").trim().toLowerCase()
      ));
    }
    await this.page.waitForTimeout( 2000 );

    if (userLoginError === '') {
      throw new Error('A página não carregou');
    }
    await this.page.waitForTimeout( 2000 );
    
    return userLoginError;
  }
}

module.exports = ( page, email ) => new PerfilPageError( page, email );