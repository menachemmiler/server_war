export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto extends LoginDto {
  location?: string;
  organiz: string;
}
