import { createHmac } from 'crypto';

export function sortObject(obj: Record<string, string >): Record<string, string > {
    return Object.keys(obj)
        .sort()
        .reduce((result, key) => {
            result[key] = obj[key];
            return result;
        }, {} as Record<string, string>);
}

export function createHash(data: string, secret: string): string {
    return createHmac('sha512', secret)
        .update(Buffer.from(data, 'utf-8'))
        .digest('hex');
}

export function formatDate(date: Date): string {
    return date.toISOString()
        .replace(/T/, '')
        .replace(/[-:]/g, '')
        .replace(/\..+/, '');
}