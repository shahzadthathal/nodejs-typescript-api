import bcrypt from 'bcrypt';

const saltRounds = 10; // Number of salt rounds for bcrypt

// Function to hash a password
export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, saltRounds);
}

/**
 * Compare a plaintext password with a hashed password.
 * @param {string} plaintextPassword The plaintext password to compare.
 * @param {string} hashedPassword The hashed password to compare against.
 * @returns {Promise<boolean>} A promise that resolves to true if the passwords match, otherwise false.
 */
export async function comparePassword(plaintextPassword: string, hashedPassword: string): Promise<boolean> {
    try {
        // Compare the plaintext password with the hashed password
        const match = await bcrypt.compare(plaintextPassword, hashedPassword);
        return match;
    } catch (error) {
        // Handle any errors
        console.error('Error comparing passwords:', error);
        throw new Error('Error comparing passwords');
    }
}