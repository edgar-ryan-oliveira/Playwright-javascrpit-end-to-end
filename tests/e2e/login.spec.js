const {test , expect} = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage') 
const { MoviesPage } = require('../pages/MoviesPage')
const { Toast } = require('../pages/Componentes')

let loginPage
let toast
let moviePage

test.beforeEach(({page}) => {
    loginPage = new LoginPage(page)
    moviePage = new MoviesPage(page)
    toast = new Toast(page)
})

test('deve logar com admin e senha validos ', async ({ page }) => {
    await loginPage.visit()  
    await loginPage.submit('admin@zombieplus.com','pwd123')  
    await moviePage.isLoggedIn()
});

test('não deve logar com senha inválida ', async ({ page }) => {
    await loginPage.visit()  
    await loginPage.submit('admin@zombieplus.com','123456')  
    const message = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."
    await toast.containText(message)
    
});
test('não deve logar quando o email não é preenchido ', async ({ page }) => {
    await loginPage.visit()  
    await loginPage.submit('','abc123')  
    await loginPage.alertHaveText('Campo obrigatório')
});

test('não deve logar quando o email  é inválido ', async ({ page }) => {
    await loginPage.visit()  
    await loginPage.submit('www.edgar.com.br','abc123')  
    await loginPage.alertHaveText('Email incorreto')
});


test('não deve logar quando a senha não é preenchida ', async ({ page }) => {
    await loginPage.visit()  
    await loginPage.submit('admin@zombieplus.com','')  
    await loginPage.alertHaveText('Campo obrigatório')
});
test('não deve logar quando nenhum campo é preenchido', async ({ page }) => {
    await loginPage.visit()  
    await loginPage.submit('','')  
    await loginPage.alertHaveText(['Campo obrigatório','Campo obrigatório'])
});




