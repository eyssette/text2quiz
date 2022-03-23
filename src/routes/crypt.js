import {
	default as B
} from 'buffer'
import CryptoES from 'crypto-es';
const {
	Buffer
} = B

export function encrypt(string, key) {
	return CryptoES.Rabbit.encrypt(string, key).toString();
}

export function decrypt(string, key) {
	const hex = CryptoES.Rabbit.decrypt(string, key);
	return Buffer.from(hex.toString(), 'hex').toString()
}

export function hash(string) {
	return CryptoES.MD5(string);
}