import BounceOut from "./BounceOut";

export default (p: number): number => {
	return 1 - BounceOut(1 - p);
};
