export interface ICategory {
    getAll(): Promise<any[]>;
    getById(id: number): Promise<any | null>;
    create(category: any): Promise<any>;
    update(id: number, updatedCategory: any): Promise<any | null>;
    delete(id: number): Promise<boolean>;
    exists(id: number): Promise<boolean>;
}
