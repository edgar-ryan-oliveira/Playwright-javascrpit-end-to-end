const {test} = require ('@playwright/test');


const { LoginPage } = require('../pages/LoginPage') 
const { MoviesPage } = require('../pages/MoviesPage')
const { Toast } = require('../pages/Componentes')

const data = require('../suppport/fixtures/movies.json')

let loginPage
let toast
let moviePage

test.beforeEach(({page}) => {
    loginPage = new LoginPage(page)
    moviePage = new MoviesPage(page)
    toast = new Toast(page)
})

test('deve poder cadastrar um novo filme', async ({page}) =>{
    const movie = data.create

    // precisa estar logado 
     await loginPage.visit()  
    await loginPage.submit('admin@zombieplus.com','pwd123')  
    await moviePage.isLoggedIn()

    await moviePage.createMovie(movie.title, movie.overview, movie.company, movie.release_year)
    await toast.containText('Cadastro realizado com sucesso!')



    
     





})



