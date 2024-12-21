// /lib/mockUsers.ts
export interface User {
    firstName: string;
    lastName: string;
    userNameId: string;
    password: string;
    phonePrefix: string;
    phone: string;
    birthYear: string;
    birthMonth: string;
    birthDay: string;
    receiveSms: boolean;
    email: string;
    receiveEmail: boolean;
    referrerId?: string;
  }
  
  export let users: User[] = [];
  