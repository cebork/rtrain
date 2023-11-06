export interface IAccountModel {
    email: string;
    password: string;
    image?: string;
    firstName: string;
    lastName: string;
    jobPosition: string;
}

export class AccountModel implements IAccountModel{
  email: string;
  password: string;
  firstName: string;
  image?: string;
  jobPosition: string;
  lastName: string;


  constructor(email: string, password: string, firstName: string, image: string, jobPosition: string, lastName: string) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.image = image;
    this.jobPosition = jobPosition;
    this.lastName = lastName;
  }

  // accountDTO: { email: string; password: string; image?: string | undefined; firstName: string; lastName: string; jobPosition: string; };


  // constructor(accountDTO: {
  //   email: string;
  //   password: string;
  //   image?: string | undefined;
  //   firstName: string;
  //   lastName: string;
  //   jobPosition: string
  // }) {
  //   this.accountDTO = accountDTO;
  // }
}
