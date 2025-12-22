import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../../infrastructure/repositories/item.repository';
import { ItemEntity } from '../../domain/entities/item/item.entity';

@Injectable()
export class ItemsService {
  constructor(private itemRepository: ItemRepository) {}

  async allItems(): Promise<ItemEntity[] | null> {
    return await this.itemRepository.loadAll();
  }
}
