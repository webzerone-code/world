import { DomainError } from './domain-error';

export class BuildingNotFoundError extends DomainError {
  constructor(buildingId: string) {
    super(`Building with id "${buildingId}" was not found`);
  }
}
