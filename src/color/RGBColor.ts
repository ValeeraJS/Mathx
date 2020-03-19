import IRGBColor from "./interfaces/IRGBColor";
import ColorName from "./ColorName";

export default class RGBColor implements IRGBColor {
    static create(r = 0, g = 0, b = 0) {
        return new RGBColor(r, g, b);
    }

    public r: number;
    public g: number;
    public b: number;

    public constructor(r = 0, g = 0, b = 0) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    clone() {
        return new RGBColor(this.r, this.g, this.b);
    }
    
    equals(color: IRGBColor) {
        return color.r === this.r && color.g === this.g && color.b === this.b;
    }

    from(color: IRGBColor) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;

        return this;
    }

    fromArray(array: ArrayLike<number>, offset = 0) {
        this.r = array[ offset ];
		this.g = array[ offset + 1 ];
        this.b = array[ offset + 2 ];
        
        return this;
    }

    fromHex(hex: number) {
        this.r = hex >> 16;
		this.g = hex >> 8 & 255;
		this.b = hex & 255;

		return this;
    }

    fromScalar(scalar: number) {
        this.r = scalar;
		this.g = scalar;
		this.b = scalar;

		return this;
    }

    fromString(str: string) {
        if (str in ColorName) {
            return this.fromHex(ColorName[str]);
        }
    }
}