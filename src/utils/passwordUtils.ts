import bcrypt from 'bcrypt';

const saltRounds = 10; // You can adjust this based on your security requirements

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw error; // Handle the error as per your application's needs
    }
};
