class PerfilPage {
  constructor( page ) {
    this.page = page;
    this.headerDropdownAccount = '.js-feature-preview-indicator-container';
    this.menuProfile = '.dropdown-menu a[data-ga-click="Header, go to profile, text:your profile"]';
    this.avatarUser = '.avatar-user';
    this.cardNamePerfil = '.vcard-fullname';
    this.cardNameLogin = '.vcard-username';
  }

  async perfil() {
    await this.page.waitForSelector( this.headerDropdownAccount );
    await this.page.click( this.headerDropdownAccount );
    await this.page.waitForTimeout( 1200 );
    
    await this.page.waitForSelector( this.menuProfile );
    await this.page.click( this.menuProfile );
    await this.page.waitForTimeout( 1200 );
    
    await this.page.waitForSelector( this.avatarUser );
    await this.page.waitForTimeout( 1200 );

    const userperfil = await this.page.$eval(this.cardNamePerfil, el => (
      el.textContent.replace(".", "").trim().toLowerCase()
    ));
    await this.page.waitForTimeout( 1200 );

    const userlogin =  await this.page.$eval(this.cardNameLogin, el => (
      el.textContent.replace(".", "").trim().toLowerCase()
    ));

    return { userperfil, userlogin };
  }
}

module.exports = ( page ) => new PerfilPage( page );