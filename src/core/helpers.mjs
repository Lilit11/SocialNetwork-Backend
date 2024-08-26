import bcrypt from 'bcrypt'

export const  hashPassword =  async (orgPass) =>{
    try {
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(orgPass, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password: ' + error.message);
    }
}

export const verifyPassword =  async (orgPassword,  hashedPassword) =>{
    try {
       const isMatching =  await bcrypt.compare(orgPassword, hashedPassword)
        return isMatching;
    } catch (error) {
        throw new Error('Error hashing password: ' + error.message);
    }
}

