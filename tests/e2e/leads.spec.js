import { expect, test } from '@playwright/test';
const { LandingPage } = require('../pages/LandingPage')
// aqui estamos importandfo a biblioteca faker para gerar dados aleatórios para os testes
// nesse caso estamos usando para gerar nomes e emails aleatórios.
const { faker } = require('@faker-js/faker')
const { MoviesPage } = require('../pages/MoviesPage')
const { Toast } = require('../pages/Componentes')

let landingPage

let moviePage
let toast
// o beforeEach é um hook do Playwright que é executado antes de cada teste, nesse caso ele vai 
// instanciar a classe LandingPage e passar o objeto page para ela, assim podemos reutilizar os 
// métodos da classe em todos os testes. 
test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
  moviePage = new MoviesPage(page)
  toast = new Toast(page)

})


test('deve cadastrar um lead na fila de espera', async ({ page  }) => {
  // Instanciando a classe LandingPage e passando o objeto page  
  // criado pelo Playwright para reutilizar seus métodos no teste.
  // faker.person.fullName() gera um nome aleatório
  // faker.internet.email() gera um email aleatório
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email() 

 
  await landingPage.visit()
  await landingPage.openModal()
  await landingPage.submitleadForm(leadName, leadEmail)
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await toast.containText(message)
  await page.waitForTimeout(5000);
});
test('não deve cadastrar quando email ja existe', async ({ page , request }) => {
  
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email() 
   const newLeadrequest = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })
  expect(newLeadrequest.ok()).toBeTruthy()

  await landingPage.visit()
  await landingPage.openModal()
  await landingPage.submitleadForm(leadName, leadEmail)
  await landingPage.visit()
  await landingPage.openModal()
  await landingPage.submitleadForm(leadName, leadEmail)
  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await toast.containText(message)
  
});

test('Cadastro com email em branco', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openModal()
  await landingPage.submitleadForm('Rubia vitoria', '')
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await landingPage.alertHavetext('Campo obrigatório')
});
test('Cadastro com nome em branco', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openModal()
  await landingPage.submitleadForm('', 'rubiaitoria@gmail.com')
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await landingPage.alertHavetext('Campo obrigatório')
});
test('Cadastro com email incorreto', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openModal()
  await landingPage.submitleadForm('Rubia vitoria', 'rubiaitoria.com.br')
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await landingPage.alertHavetext('Email incorreto')
});
test('Não deve cadastrar com nome e email em branco', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openModal()
  await landingPage.submitleadForm('', '')
  // nesse caso como temos dois campos para validar com a mesma mensagem, precisamos criar um away para conseguir fazer a validação
  await expect(page.locator('.alert')).toHaveText([
    'Campo obrigatório',
    'Campo obrigatório',
  ])
});

