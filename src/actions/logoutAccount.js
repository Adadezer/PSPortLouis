const chalk = require( 'chalk' );

class logoutAccount {
  constructor ( page ) {
    this.page = page;
    this.headerDropdownAccount = '.js-feature-preview-indicator-container';
    this.btnLogout = '.logout-form'
  }

  async logout () {
    try {
      await this.page.waitForSelector(this.headerDropdownAccount);
      await this.page.click(this.headerDropdownAccount);
      await this.page.waitForTimeout( 1000 );

      await this.page.waitForSelector(this.btnLogout);
      await this.page.click(this.btnLogout);
      await this.page.waitForTimeout( 2000 );

      const homepage = await this.page.$eval('.HeaderMenu-link--sign-in' , el => (
        el.textContent.toLowerCase()
      ))
      
      return homepage;
    } catch ( err ) {
      console.error( chalk.red( 'ERROR => ', err ) );
    }
  }
}

module.exports = ( page ) => new logoutAccount( page );