let loginAccount =  require('../actions/loginAccount');
require('dotenv').config();

jest.setTimeout(60000);

describe('Autenticação básica de teste', () => {
  let credential;
  beforeAll( async () => {
    await page.setViewport( {
      width: 1280,
      height: 720,
      deviceScaleFactor: 1
    } );

    loginAccount = await loginAccount( page );
  } );

  it( 'Deve fazer o login com sucesso', async () => {
    const userLogin = await loginAccount.login( process.env.USERNAME, process.env.PASSWORD );
    const userName = userLogin.toLowerCase();
    const userNameEnv = process.env.USERNAME.toLowerCase();
    page.waitForTimeout( 1000 );
    expect( userNameEnv ).toContain( userName );
  } );
} );