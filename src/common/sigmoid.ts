export const sigmoid = (v: number) => {
    return 1 / (1 + Math.exp(-v));
}
