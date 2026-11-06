
import { expect } from '@playwright/test';


export class LandingPage {
    // eu preciso criar o contrutor pra receber o escopo
    // que é a sessaõ do navegador do playwright para podr ter acesso
    // a todos os elemntos da pagina, criando o this page e recebendo o page que vem da função de teste  
    constructor(page){
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000');

    }
    async openModal() {
        await this.page.getByRole('button', { name: /Aperte o play/ }).click()


    }
    async submitleadForm(name,email) {
        await this.page.getByPlaceholder('informe seu nome').fill(name)
        await this.page.getByPlaceholder('Informe seu email').fill(email)
        await this.page.getByText('Quero entrar na fila!').click()


    }
    async toastHaveText(message) {
        const toast =  await this.page.locator('.toast')
        await expect(toast).toHaveText(message)
        await expect(toast).toBeHidden({ timeout: 5000 })
    }

    async alertHavetext(target){
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

}