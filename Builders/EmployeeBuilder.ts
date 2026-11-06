import { v4 as uuidv4 } from 'uuid'
import type { Employee } from '../Types/Employee'

export class EmployeeBuilder {
    private readonly employee: Employee;

    constructor() {
        const uniqueID = uuidv4().slice(0, 8)
        this.employee = {
            firstName: `first-${uniqueID}`,
            lastName: `last-${uniqueID}`,
            email: `email-${uniqueID}@email.com`,
        }
    }

    withPhoneNumber(phone: string) {
        this.employee.phone = phone
        return this
    }

    withStartDate(startDate: string) {
        this.employee.startDate = startDate
        return this
    }

    withJobTitle(jobTitle: string) {
        this.employee.jobTitle = jobTitle
        return this
    }

    withRegistrationEmail(value: boolean) {
        this.employee.sendRegistrationEmail = value
        return this
    }

    build(): Employee {
        return { ...this.employee }
    }
}