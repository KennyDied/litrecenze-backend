import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String, example: 'example@email.com', description: 'Электронная почта пользователя' })
  readonly email: string;

  @ApiProperty({ type: String, example: 'password', description: 'Пароль. Хешированный' })
  readonly passwordHash: string;

  @ApiProperty( { type: String, example: 'Иван', description: 'Имя пользователя' })
  readonly firstName: string;

  @ApiProperty({ type: String, example: 'Иванов', description: 'Фамилия пользователя' })
  readonly secondName: string;

  readonly phone?: string;
}