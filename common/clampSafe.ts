export default (val: number, a: number, b: number) => {
    if (a > b) {
        return Math.max(b, Math.min(a, val));
    } else if (b > a) {
        return Math.max(a, Math.min(b, val));
    }
    return a;
}
