import { Injectable } from '@nestjs/common';
import { UserItemRepository } from '../../infrastructure/repositories/user.item.repository';
import { UserItemEntity } from '../../domain/entities/userItems/user.item.entity';

@Injectable()
export class UserItemsService {
  public constructor(private readonly userItemRepository: UserItemRepository) {}

  public async getAllUserItems(): Promise<UserItemEntity[] | null> {
    return await this.userItemRepository.findALlUserItems();
  }
}
