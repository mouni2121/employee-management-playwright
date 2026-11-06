import { expect, Locator, Page } from '@playwright/test'
import type { Employee } from '../Types/Employee'

export class EmployeeHubPage {
    readonly employeeForm: Locator
    readonly firstName: Locator
    readonly lastName: Locator
    readonly emailAddress: Locator
    readonly sendRegistrationEmail: Locator
    readonly phoneNumber: Locator
    readonly startDate: Locator
    readonly jobTitle: Locator
    readonly saveNewEmployee: Locator
    readonly addEmployee: Locator
    readonly addAnotherEmployee: Locator
    readonly closeBtn: Locator

    constructor(readonly page: Page) {
        this.employeeForm = page.getByTestId('background').locator('form')
        this.firstName = this.employeeForm.getByLabel('First name')
        this.lastName = this.employeeForm.getByLabel('Last name')
        this.emailAddress = this.employeeForm.getByLabel('Email address')
        this.sendRegistrationEmail = this.employeeForm.getByLabel('Send registration email')
        this.phoneNumber = this.employeeForm.getByLabel('Phone number')
        this.startDate = this.employeeForm.getByLabel('Start date')
        this.jobTitle = this.employeeForm.getByLabel('Job title')
        this.saveNewEmployee = this.employeeForm.getByRole('button', {
            name: 'Save new employee',
        })
        this.addEmployee = page.getByRole('button', { name: 'Add employee' })
        this.addAnotherEmployee = page.getByRole('button', {
            name: 'Add another employee',
        })
        this.closeBtn = page.getByLabel('Close modal')
    }

    async openEmployeeModal() {
        await this.addEmployee.click()
        await expect(this.employeeForm).toBeVisible()
    }

    async closeEmployeeModal() {
        await this.closeBtn.click()
    }

    async createEmployee(employee: Employee) {
        await this.firstName.fill(employee.firstName)
        await this.lastName.fill(employee.lastName)
        await this.emailAddress.fill(employee.email)

        if (employee.phone !== undefined) {
            await this.phoneNumber.fill(employee.phone)
        }

        if (employee.startDate !== undefined) {
            await this.startDate.fill(employee.startDate)
        }

        if (employee.jobTitle !== undefined) {
            await this.jobTitle.fill(employee.jobTitle)
        }

        if (employee.sendRegistrationEmail !== undefined) {
            await this.sendRegistrationEmail.setChecked(employee.sendRegistrationEmail)
        }

        await this.saveNewEmployee.click()
    }

    successMessage(name: string): Locator {
        return this.page.getByText(`${name} added to BrightHR`)
    }

    async addEmployeeFromModal() {
        await this.addAnotherEmployee.click()
        await expect(this.employeeForm).toBeVisible()
    }

    getEmployeeCard(firstName: string, lastName: string): Locator {
        const employeeName = this.page.getByRole('heading', {
            name: `${firstName} ${lastName}`,
            exact: true,
        })

        return this.page
            .locator('div.flex.items-center.justify-between')
            .filter({ has: employeeName })
    }

    async openEmployeeIfExists(employee: Employee): Promise<boolean> {
        const employeeCard = this.getEmployeeCard(employee.firstName, employee.lastName)

        try {
            await employeeCard.waitFor({ state: 'visible', timeout: 15_000 })
        } catch (error) {
            if (error instanceof Error && error.name === 'TimeoutError') {
                return false
            }
            throw error
        }

        await employeeCard.getByTestId('EditButton').click()
        return true
    }
}
