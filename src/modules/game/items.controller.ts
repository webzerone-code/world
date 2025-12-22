import { Controller, Get } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemEntity } from '../../domain/entities/item/item.entity';

@Controller('game/items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  async allItems(): Promise<ItemEntity[] | null> {
    return await this.itemsService.allItems();
  }
}
