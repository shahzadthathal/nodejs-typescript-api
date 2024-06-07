import { Request, Response } from 'express';
import categoryRepository from '../repositories/CategoryRepository';
import { categorySchema } from '../validators/CategoryValidator';


class CategoryController {
    async getAll(req: Request, res: Response) {
        try {
            const categories = await categoryRepository.getAll();
            res.json(categories);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const category = await categoryRepository.getById(Number(req.params.id));
            if (category) {
                res.json(category);
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { error } = categorySchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const newCategory = await categoryRepository.create(req.body);
            res.status(201).json(newCategory);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { error } = categorySchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const updatedCategory = await categoryRepository.update(Number(req.params.id), req.body);
            if (updatedCategory) {
                res.json(updatedCategory);
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const result = await categoryRepository.delete(Number(req.params.id));
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new CategoryController();
