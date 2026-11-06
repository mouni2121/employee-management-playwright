import { expect, Locator, Page } from '@playwright/test'

export class LoginPage {
    readonly logInLink: Locator
    readonly emailAddress: Locator
    readonly password: Locator
    readonly loginBtn: Locator

    constructor(readonly page: Page) {
        this.logInLink = page.getByRole('link', { name: 'Log in' })
        this.emailAddress = page.getByRole('textbox', { name: 'Email address' })
        this.password = page.getByLabel('Password')
        this.loginBtn = page.getByRole('button', { name: 'Login' })
    }

    async login(emailAddress: string, password: string) {
        await this.page.goto('/lite')
        await this.logInLink.click()
        await expect(this.page).toHaveURL(/login/)
        await this.emailAddress.fill(emailAddress)
        await this.password.fill(password)
        await this.loginBtn.click()
    }
}
