export interface IAuth {
    getByEmail(email: string): Promise<any | null>;
    register(userData: any): Promise<any>;
}
