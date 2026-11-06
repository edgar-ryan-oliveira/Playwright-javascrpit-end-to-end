const { expect } = require('@playwright/test')




export class LoginPage {

    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000/admin/login')
        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async submit(email, password) {

        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)
        await this.page.getByText('Entrar').click()

    }

   
    // com esse metodo podemos localizar o text que precisamos para validar 
    // as mesnagens que se repitam entre os campos assim visando reuso e aproveitamento de código.
    async alertHaveText(text) {
        const alert = this.page.locator('span[class$=alert]')
        await expect(alert).toHaveText(text)
    }




}