import { SHA256, enc } from 'crypto-js';

export const encrypt = (text: string) => {
    return SHA256(text).toString(enc.Hex);
};