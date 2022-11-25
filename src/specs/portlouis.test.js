jest.setTimeout(60000)

describe('autenticação básica de teste', () => {
  beforeAll( async () => {

    await page.setViewport( {
      width: 1280,
      height: 720,
      deviceScaleFactor: 1
    } );	

    await page.goto('https://www.github.com');

    await page.waitForTimeout(5000);
    } );

  it( 'Deve ser verdadeiro', async () => {
    expect( true ).toBeTruthy();
  })	
});