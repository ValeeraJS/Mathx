export default (num: number) => {
    return (num < 0) ? Math.ceil(num) : Math.floor(num)
}
