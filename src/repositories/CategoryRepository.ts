import { ICategory } from '../interfaces/ICategory';
import db from '../models';
import { generateSlug } from '../utils/Slug';

class CategoryRepository implements ICategory {
    async getAll(): Promise<any[]> {
        return await db.Category.findAll();
    }

    async getById(id: number): Promise<any | null> {
        return await db.Category.findByPk(id);
    }

    async create(category: any): Promise<any> {
        category.slug = generateSlug(category.name);
        return await db.Category.create(category);
    }

    async update(id: number, updatedCategory: any): Promise<any | null> {
        const category = await db.Category.findByPk(id);
        if (category) {
            updatedCategory.slug = generateSlug(updatedCategory.name);
            await category.update(updatedCategory);
            return category;
        }
        return null;
    }

    async delete(id: number): Promise<boolean> {
        const category = await db.Category.findByPk(id);
        if (category) {
            await category.destroy();
            return true;
        }
        return false;
    }

    async exists(id: number): Promise<boolean> {
        const category = await db.Category.findByPk(id);
        return !!category;
    }
}

export default new CategoryRepository();
