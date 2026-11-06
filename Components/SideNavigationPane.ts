import { expect, Locator, Page } from '@playwright/test'

export class SideNavigationPane {
    readonly home: Locator
    readonly employees: Locator
    readonly employeeHub: Locator

    constructor(readonly page: Page) {
        this.home = page.getByLabel('Home')
        this.employees = page.getByRole('link', { name: 'Employees', exact: true })
        this.employeeHub = page.getByRole('heading', { name: 'Employee hub' })
    }

    async verifyLogin() {
        await expect(this.home).toBeVisible()
    }

    async navigateToEmployees() {
        await this.employees.click()
        await expect(this.employeeHub).toBeVisible()
    }
}
