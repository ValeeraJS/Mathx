import BounceIn from "./BounceIn";
import BounceOut from "./BounceOut";

export default (p: number): number => {
	if (p < 0.5) {
		return BounceIn(p * 2) * 0.5;
	}

	return BounceOut(p * 2 - 1) * 0.5 + 0.5;
};
