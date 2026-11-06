import { test, expect } from '../Fixtures/fixtures'
import { EmployeeBuilder } from '../Builders/EmployeeBuilder'

test.describe('Employee management', () => {
    test.beforeEach(async ({ loginPage, sideNavigationPane }) => {
        await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!)
        await sideNavigationPane.verifyLogin()
        await sideNavigationPane.navigateToEmployees()
    });

    test('should create employees successfully', async ({
        employeeHubPage,
        createdEmployees,
    }) => {
        const employee1 = new EmployeeBuilder()
                          .withPhoneNumber('07777777777')
                          .withStartDate('01/01/2025')
                          .withJobTitle('Senior Manager')
                          .build()
        const employee2 = new EmployeeBuilder()
                          .withPhoneNumber('07777777787')
                          .withStartDate('01/01/2026')
                          .withJobTitle('Senior QA')
                          .build()
        createdEmployees.push(employee1, employee2)

        await test.step('Create the first employee', async () => {
            await employeeHubPage.openEmployeeModal()
            await employeeHubPage.createEmployee(employee1)
            await expect(employeeHubPage.successMessage(employee1.firstName)).toBeVisible()
        })

        await test.step('Create the second employee', async () => {
            await employeeHubPage.addEmployeeFromModal()
            await employeeHubPage.createEmployee(employee2)
            await expect(employeeHubPage.successMessage(employee2.firstName)).toBeVisible()
            await employeeHubPage.closeEmployeeModal()
        })

        await test.step('Verify both employees appear in Employee Hub', async () => {
            await expect(
                employeeHubPage.getEmployeeCard(employee1.firstName, employee1.lastName)
            ).toBeVisible({ timeout: 30_000 })
            await expect(
                employeeHubPage.getEmployeeCard(employee2.firstName, employee2.lastName)
            ).toBeVisible({ timeout: 30_000 })
        })
    })

    test('should enable Save new employee only when required fields are provided', async ({
        employeeHubPage,
    }) => {
        const employee = new EmployeeBuilder().build()

        await test.step('Open the Add Employee form', async () => {
            await employeeHubPage.openEmployeeModal()
        })

        await test.step('Save is disabled when required fields are empty', async () => {
            await expect(employeeHubPage.saveNewEmployee).toBeDisabled()
        })

        await test.step('Save remains disabled when required fields are incomplete', async () => {
            await employeeHubPage.firstName.fill(employee.firstName)
            await employeeHubPage.lastName.fill(employee.lastName)
            await expect(employeeHubPage.saveNewEmployee).toBeDisabled()
        })

        await test.step('Save is enabled when all required fields are complete', async () => {
            await employeeHubPage.emailAddress.fill(employee.email)
            await expect(employeeHubPage.saveNewEmployee).toBeEnabled()
        })
    })
})
