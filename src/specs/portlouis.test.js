require('dotenv').config();
let loginAccount =  require('../actions/loginAccount');
let perfilPage = require('../actions/perfilPage');
let reposiries = require('../actions/repositories');

jest.setTimeout(60000);

describe('Autenticação básica de teste', () => {
  const userLoginEnvLower = process.env.USER_LOGIN.toLowerCase();
  const userPerfilEnvLower = process.env.PERFIL_USER_NAME.toLowerCase();

  beforeAll( async () => {
    await page.setViewport( {
      width: 1280,
      height: 720,
      deviceScaleFactor: 1
    } );

    loginAccount = await loginAccount( page );
    perfilPage = await perfilPage( page, process.env.USER_LOGIN );
    reposiries = await reposiries(page, process.env.USER_LOGIN);
  } );

  it( 'Deve fazer o login com sucesso', async () => {
    const userLogin = await loginAccount.login( process.env.USER_LOGIN, process.env.PASSWORD );
    page.waitForTimeout( 1000 );
    expect( userLoginEnvLower ).toEqual( userLogin );
  } );

  it( 'Deve validar o nome de usuário na página do perfil', async () => {
    const userPerfil = await perfilPage.perfil();
    page.waitForTimeout( 1000 );
    expect( userPerfilEnvLower ).toEqual( userPerfil.userperfil );
    expect( userLoginEnvLower ).toEqual( userPerfil.userlogin );
  } );

  it( 'Deve acessar um repositório, e abrir a aba "pull requests"', async () => {
    const prInRepositorie = await reposiries.repositoriesTab();
    page.waitForTimeout( 1000 );
    expect( prInRepositorie ).toContain( 'pull request' );
  } );
});