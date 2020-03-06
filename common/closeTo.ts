export default (val: number, target: number, epsilon: number = Number.EPSILON) => {
    return Math.abs(val - target) < epsilon;
}
