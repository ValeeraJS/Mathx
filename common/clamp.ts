export default (val: number, min: number, max: number) => {
    return Math.max(min, Math.min(max, val));
}
