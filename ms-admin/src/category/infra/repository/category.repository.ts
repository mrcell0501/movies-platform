import { InMemorySearchableRepository } from "@common/domain/repository/in-memory.repository";
import { Category } from "category/domain/entities/category";
import { CategoryRepository } from "category/domain/repositories/category.repository";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository {}
