class Repositories {
  constructor( page ) {
    this.page = page;
    this.tabRepositories = '.Layout-main a[data-tab-item="repositories"]';
    this.repositoriesList = '#user-repositories-list';
    this.repositorie = '.wb-break-all a';
    this.tabPullRequests = '.js-repo-nav .UnderlineNav-body #pull-requests-tab';
  }

  async repositoriesTab () {
    await this.page.waitForSelector(this.tabRepositories);
    await this.page.click(this.tabRepositories);
    await this.page.waitForTimeout( 1500 );

    await this.page.waitForSelector(this.repositoriesList);
    await this.page.waitForTimeout( 1500 );

    await this.page.waitForSelector(this.repositorie);
    await this.page.click(this.repositorie);
    await this.page.waitForTimeout( 1500 );

    await this.page.waitForSelector(this.tabPullRequests);
    await this.page.click(this.tabPullRequests);
    await this.page.waitForTimeout( 1500 );
    
    await this.page.waitForSelector('.application-main');
    await this.page.waitForTimeout( 2000 );

    const pullRequests = await page.$eval('.blankslate h3' , el => (
      el.textContent.trim().toLowerCase()
    ));
    
    return pullRequests;
  }
}

module.exports = ( page ) => new Repositories( page );