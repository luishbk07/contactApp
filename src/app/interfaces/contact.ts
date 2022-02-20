export interface Contact {
    id: number;
    name: string;
    lastName: string;
    phones: Phone[];
}

interface Phone {
    phoneNumber: string;
}
