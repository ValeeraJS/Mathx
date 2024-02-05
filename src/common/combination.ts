import { factorialNaturalNumber } from "./factorialNaturalNumber";

export const combination = (a: number, b: number): number => {
	return factorialNaturalNumber(a) / factorialNaturalNumber(b) / factorialNaturalNumber(a - b);
};
