require('dotenv').config();
let loginAccount =  require('../actions/loginAccount');
let perfilPage = require('../actions/perfilPage');

jest.setTimeout(60000);

describe('Autenticação básica de teste', () => {
  const userNameEnvLower = process.env.USERNAME.toLowerCase();

  beforeAll( async () => {
    await page.setViewport( {
      width: 1280,
      height: 720,
      deviceScaleFactor: 1
    } );

    loginAccount = await loginAccount( page );
    perfilPage = await perfilPage( page, process.env.USERNAME );
  } );

  it( 'Deve fazer o login com sucesso', async () => {
    const userLogin = await loginAccount.login( process.env.USERNAME, process.env.PASSWORD );
    page.waitForTimeout( 1000 );
    expect( userNameEnvLower ).toContain( userLogin );
  } );

  it( 'Deve validar o nome de usuário na página do perfil', async () => {
    const userPerfil = await perfilPage.perfil();
    page.waitForTimeout( 1000 );
    expect( userNameEnvLower ).toContain( userPerfil );
  } );
} );