import { Controller, Get } from '@nestjs/common';
import { ItemEntity } from '../../domain/entities/item/item.entity';
import { ItemsService } from '../../application/services/items.service';

@Controller('game/items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  async allItems(): Promise<ItemEntity[] | null> {
    return await this.itemsService.allItems();
  }
}
