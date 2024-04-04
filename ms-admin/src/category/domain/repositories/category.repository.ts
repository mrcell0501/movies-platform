import { SearchableRepository } from "../../../@common/domain/repository/repository.contract";
import { Category } from "../entities/category";

export interface CategoryRepository
  extends SearchableRepository<Category, any, any> {
  search(props: any): Promise<Category[]>;
}
