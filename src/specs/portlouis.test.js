require('dotenv').config();
let loginAccount =  require('../actions/loginAccount');
let perfilPage = require('../actions/perfilPage');
let perfilPageError = require('../utils/perfilPageError');
let repositories = require('../actions/repositories');
let logoutAccount = require('../actions/logoutAccount');

jest.setTimeout(60000);

describe('Suit de testes Portlouis', () => {
  const emailEnvLower = process.env.EMAIL.toLowerCase();
  const userPerfilEnvLower = process.env.PERFIL_USER_NAME.toLowerCase();

  beforeAll( async () => {
    await page.setViewport( {
      width: 1280,
      height: 720,
      deviceScaleFactor: 1
    } );

    loginAccount = await loginAccount( page );
    perfilPage = await perfilPage( page, process.env.EMAIL );
    perfilPageError = await perfilPageError( page, process.env.EMAIL );
    repositories = await repositories(page, process.env.EMAIL);
    logoutAccount = await logoutAccount( page );
  } );

  it('A autenticação de login deve falhar e o teste deve apresentar erro', async () => {
    const userLogin = await loginAccount.login( process.env.EMAIL, 'senha123' );
    page.waitForTimeout( 1000 );
    await expect(() => { userLogin }).toThrow('Autenticação falhou');
  });

  it( 'Deve fazer o login com sucesso', async () => {
    const userLogin = await loginAccount.login( process.env.EMAIL, process.env.PASSWORD );
    page.waitForTimeout( 1000 );
    
    const username = emailEnvLower.split('@')[0];
    expect( username ).toEqual( userLogin );
  } );

  it('A página de perfil deve ser mal carregada e o teste apresentar erro', async () => {
    const userPerfilError = await perfilPageError.perfilError();
    page.waitForTimeout( 1000 );
    await expect(() => { userPerfilError }).toThrow('A página não carregou');
  });

  it( 'Deve validar os nomes de perfil e usuário na página do perfil', async () => {
    const userPerfil = await perfilPage.perfil();
    page.waitForTimeout( 1000 );
    expect( userPerfilEnvLower ).toEqual( userPerfil.userperfil );

    const username = emailEnvLower.split('@')[0];
    expect( username ).toEqual( userPerfil.userlogin );
  } );

  it( 'Deve acessar um repositório, e abrir a aba "pull requests"', async () => {
    const prInRepositorie = await repositories.repositoriesTab();
    page.waitForTimeout( 1000 );
    expect( prInRepositorie ).toContain( 'pull request' );
  } );

  it('Deve fazer o logout da conta com sucesso', async () => {
    const homepage = await logoutAccount.logout();
    page.waitForTimeout( 1000 );
    expect( homepage ).toContain( 'sign in' );
  });
});