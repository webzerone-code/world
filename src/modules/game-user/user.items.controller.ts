import { Controller, Get } from '@nestjs/common';
import { UserItemEntity } from '../../domain/entities/userItems/user.item.entity';
import { UserItemsService } from '../../application/services/user.items.service';

@Controller('game/user/items')
export class UserItemsController {
  constructor(private readonly userItemsService: UserItemsService) {}

  @Get()
  async getAllUserItems(): Promise<UserItemEntity[] | null> {
    return await this.userItemsService.getAllUserItems();
  }
}
