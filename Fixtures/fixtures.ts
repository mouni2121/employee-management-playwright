import { test as base } from '@playwright/test'
import { SideNavigationPane } from '../Components/SideNavigationPane'
import { EmployeeHubPage } from '../Pages/EmployeeHubPage'
import { EmployeeProfilePage } from '../Pages/EmployeeProfilePage'
import { LoginPage } from '../Pages/LoginPage'
import type { Employee } from '../Types/Employee'

type MyFixtures = {
    loginPage: LoginPage
    employeeHubPage: EmployeeHubPage
    sideNavigationPane: SideNavigationPane
    employeeProfilePage: EmployeeProfilePage
    createdEmployees: Employee[]
}

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    employeeHubPage: async ({ page }, use) => {
        await use(new EmployeeHubPage(page))
    },
    sideNavigationPane: async ({ page }, use) => {
        await use(new SideNavigationPane(page))
    },
    employeeProfilePage: async ({ page }, use) => {
        await use(new EmployeeProfilePage(page))
    },
    createdEmployees: async ({ page, employeeHubPage, employeeProfilePage }, use) => {
        const employees: Employee[] = []
        await use(employees)

        for (const employee of employees) {
            await page.goto('/employee-hub', { waitUntil: 'domcontentloaded' })
            if (await employeeHubPage.openEmployeeIfExists(employee)) {
                await employeeProfilePage.deleteEmployee()
            }
        }
    },
})

export { expect } from '@playwright/test';