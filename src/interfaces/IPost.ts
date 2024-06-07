export interface IPost{
    getAll(): Promise<any[]>;
    getById(id: number): Promise<any | null>;
    create(post: any): Promise<any>;
    update(id: number, updatedPost: any): Promise<any | null>;
    delete(id: number): Promise<boolean>;
}
