import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity('roles')
export class Role {
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'ADMIN', description: 'Значение роли пользователя'})
  @Column({ unique: true })
  value: string;

  @ApiProperty({example: 'Администратор', description: 'Текстовое описание роли'})
  @Column()
  description: string;

  @ManyToMany(() => User, user => user.roles, { cascade: true })
  user: User;
}