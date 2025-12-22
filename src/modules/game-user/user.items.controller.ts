import { Controller, Get } from '@nestjs/common';
import { UserItemsService } from './user.items.service';
import { UserItemEntity } from '../../domain/entities/userItems/user.item.entity';

@Controller('game/user/items')
export class UserItemsController {
  constructor(private readonly userItemsService: UserItemsService) {}

  @Get()
  async getAllUserItems(): Promise<UserItemEntity[] | null> {
    return await this.userItemsService.getAllUserItems();
  }
}
