import { IPost } from '../interfaces/IPost';
import db from '../models';
import { generateSlug } from '../utils/Slug';

class PostRepository implements IPost {
    async getAll(): Promise<any[]> {
        return await db.Post.findAll({ include: db.Category });
    }

    async getById(id: number): Promise<any | null> {
        return await db.Post.findByPk(id, { include: db.Category });
    }

    async create(post: any): Promise<any> {
        post.slug = generateSlug(post.title);
        return await db.Post.create(post);
    }

    async update(id: number, updatedPost: any): Promise<any | null> {
        const post = await db.Post.findByPk(id);
        if (post) {
            updatedPost.slug = generateSlug(updatedPost.title);
            await post.update(updatedPost);
            return post;
        }
        return null;
    }

    async delete(id: number): Promise<boolean> {
        const post = await db.Post.findByPk(id);
        if (post) {
            await post.destroy();
            return true;
        }
        return false;
    }
}

export default new PostRepository();
