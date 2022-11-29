const chalk = require('chalk');

class Repositories {
  constructor( page, username ) {
    this.page = page;
    this.urlPerfil = `https://www.github.com/${username}`;
    this.urlRepositories = `https://www.github.com/${username}?tab=repositories`;
    this.repositorie = '.wb-break-all' 
  }

  async repositoriesTab () {
    try {
      await this.page.goto(this.urlRepositories);

      await this.page.waitForSelector( `#user-repositories-list` );
      await this.page.waitForTimeout( 1000 );

      const repo = await page.$eval(`${this.repositorie} a[href]` , el => (
        el.textContent.trim().toLowerCase()
      ));
      
      const linkRepo = `${this.urlPerfil}/${repo}`;

      await this.page.goto(linkRepo);
      await this.page.waitForSelector('.Layout-main');
      await this.page.waitForTimeout( 1000 );
        
      await this.page.goto(`${linkRepo}/pulls`);
      await this.page.waitForSelector('.application-main');
      await this.page.waitForTimeout( 2000 );

      const pullRequests = await page.$eval('.blankslate h3' , el => (
        el.textContent.trim().toLowerCase()
      ));
      
      return pullRequests;
    } catch (err) {
      console.error( chalk.red( 'repositories ERROR => ', err ) );
    }
  }
}

module.exports = ( page, username ) => new Repositories( page, username );