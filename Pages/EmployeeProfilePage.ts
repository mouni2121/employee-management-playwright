import { Locator, Page } from '@playwright/test'

export class EmployeeProfilePage {
    readonly deleteEmployeeRecord: Locator
    readonly deleteBtn: Locator
    readonly checkboxLabel: Locator

    constructor(page: Page) {
        this.deleteEmployeeRecord = page.getByRole('link', {
            name: 'Delete employee record',
        })
        this.deleteBtn = page.getByRole('button').filter({ hasText: /^Delete / })
        this.checkboxLabel = page.getByTestId('checkboxLabel')
    }

    async deleteEmployee() {
        await this.deleteEmployeeRecord.click()
        await this.checkboxLabel.check()
        await this.deleteBtn.click()
    }
}
