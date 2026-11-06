
import { expect } from '@playwright/test'
export class MoviesPage {

    constructor(page){
        this.page = page


    }

     async isLoggedIn() {
        // esse comando faz com que o teste espere até que a página esteja completamente carregada, incluindo todas as requisições de rede. Isso é útil para garantir que a navegação para a página de administração foi concluída antes de verificar a URL.
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/)

    }

    async createMovie(title,overview,company,release_year){

        await this.page.locator('a[href$="register"]').click()
        await this.page.getByLabel('Titulo do filme').fill(title)
        await this.page.getByLabel('Sinopse').fill(overview)
        await this.page.locator("div[id='select_company_id']").click()

        await this.page.locator('.react-select__option').filter({ hasText: company }).click()
         
        await this.page.locator("div[id='select_year']").click()

        await this.page.locator('.react-select__option').filter({ hasText: release_year }).click()
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()

       
    }




}