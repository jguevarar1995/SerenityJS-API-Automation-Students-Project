import { enc,SHA256 } from 'crypto-js';

export const encrypt = (text: string): string => {
    return SHA256(text).toString(enc.Hex);
};