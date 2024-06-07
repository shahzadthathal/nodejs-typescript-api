// Interface for token generation
export interface ITokenGenerator {
    generateToken(payload: TokenPayload): string;
}

// Payload interface
export interface TokenPayload {
    id: number;
    email: string;
}