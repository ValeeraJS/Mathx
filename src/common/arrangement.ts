import { factorialNaturalNumber } from "./factorialNaturalNumber";

export const arrangement = (a: number, b: number) => {
	return factorialNaturalNumber(a) / factorialNaturalNumber(a - b);
};
