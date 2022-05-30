import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Repository } from 'typeorm';
import { Club } from './entities/club.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { CLUB_NOT_FOUND, USER_ALREADY_JOINED } from './errors';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club) private clubsRepository: Repository<Club>,
    private usersService: UsersService,
  ) {}

  async create(dto: CreateClubDto, req: any) {
    const user = await this.usersService.getUser(req.user.id);
    const club = await this.clubsRepository.create(dto);
    club.owner = user;
    club.members = [user];
    return await this.clubsRepository.save(club);
  }

  async findAll() {
    return await this.clubsRepository.find({
      relations: {
        owner: true,
        members: true,
      }
    });
  }

  async join(id: number, req: any) {
    const user = await this.usersService.getUser(req.user.id);
    const club = await this.findOne(id);

    if (!club) throw new HttpException(CLUB_NOT_FOUND, HttpStatus.BAD_REQUEST);
    if (club.members.some(_ => _.id === user.id)) throw new HttpException(USER_ALREADY_JOINED, HttpStatus.BAD_REQUEST);

    club.members.push(user);
    return await this.clubsRepository.save(club);
  }

  async findOne(id: number) {
    return await this.clubsRepository.findOne({
      where: { id },
      relations: {
        members: true,
      }
    });
  }

  update(id: number, updateCludDto: UpdateClubDto) {
    return `This action updates a #${id} clud`;
  }

  remove(id: number) {
    return `This action removes a #${id} clud`;
  }
}
