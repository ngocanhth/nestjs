export default class RegisterDto {
  email: string;
  name: string;
  password: string;
}

//@ValidateIf((object, value) => value !== undefined)