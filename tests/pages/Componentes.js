const { expect } = require('@playwright/test')


export class Toast {

    constructor(page){
        this.page = page
    }
     async containText(message) {
        const toastMessage = this.page.locator('.toast')
        await expect(toastMessage).toContainText(message)
        await expect(toastMessage).not.toBeVisible({ timeout: 5000 })

    }
    
    }