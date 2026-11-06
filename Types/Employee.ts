export interface Employee {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    startDate?: string;
    jobTitle?: string;
    sendRegistrationEmail?: boolean;
}