

export type SignupTermProps = {
    onAgree: () => void;
  }



  export type FormData =  {
    firstName: string;
    lastName: string;
    userNameId: string;
    password: string;
    verifyPassword: string;
    phonePrefix: string;
    phone: string;
    birthYear: string;
    birthMonth: string;
    birthDay: string;
    receiveSms: boolean;
    email: string;
    receiveEmail: boolean;
    referrerId: string;
  }
  

  export type FormErrors =  {
    firstName: string;
    lastName: string;
    userNameId: string;
    password: string;
    verifyPassword: string;
    phone: string;
    birthYear: string;
    birthMonth: string;
    birthDay: string;
    email: string;
  }
  
export type ConfirmRegistrationProps =  {
  formData: FormData;
}
