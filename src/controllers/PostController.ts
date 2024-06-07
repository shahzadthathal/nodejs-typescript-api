import { Request, Response } from 'express';
import postRepository from '../repositories/PostRepository';
import categoryRepository from '../repositories/CategoryRepository';
import { postSchema } from '../validators/PostValidator';

class PostController {
    async getAll(req: Request, res: Response) {
        try {
            const posts = await postRepository.getAll();
            res.json(posts);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const post = await postRepository.getById(Number(req.params.id));
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { error } = postSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const categoryId = req.body.category_id;
            const categoryExists = await categoryRepository.exists(categoryId);
            if (!categoryExists) {
                return res.status(400).json({ error: 'Category does not exist' });
            }

            const newPost = await postRepository.create(req.body);
            res.status(201).json(newPost);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { error } = postSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const categoryId = req.body.category_id;
            const categoryExists = await categoryRepository.exists(categoryId);
            if (!categoryExists) {
                return res.status(400).json({ error: 'Category does not exist' });
            }

            const updatedPost = await postRepository.update(Number(req.params.id), req.body);
            if (updatedPost) {
                res.json(updatedPost);
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const result = await postRepository.delete(Number(req.params.id));
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new PostController();
