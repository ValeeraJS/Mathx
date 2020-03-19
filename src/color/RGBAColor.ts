import IRGBColor from "./interfaces/IRGBColor";
import ColorName from "./ColorName";
import IRGBAColor from "./interfaces/IRGBAColor";

export default class RGBAColor implements IRGBAColor {
    static create(r = 0, g = 0, b = 0, a = 1) {
        return new RGBAColor(r, g, b, a);
    }

    public r: number;
    public g: number;
    public b: number;
    public a: number;

    public constructor(r = 0, g = 0, b = 0, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    clone() {
        return new RGBAColor(this.r, this.g, this.b, this.a);
    }
    
    equals(color: IRGBAColor) {
        return color.r === this.r && color.g === this.g && color.b === this.b && color.a === this.a;
    }

    from(color: IRGBAColor) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.a = color.a;

        return this;
    }

    fromRGB(color: IRGBColor) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.a = 1;

        return this;
    }

    fromArray(array: ArrayLike<number>, offset = 0) {
        this.r = array[ offset ];
		this.g = array[ offset + 1 ];
        this.b = array[ offset + 2 ];
        this.a = array[ offset + 3 ];
        
        return this;
    }

    fromHex(hex: number, a = 1) {
        this.r = hex >> 16;
		this.g = hex >> 8 & 255;
        this.b = hex & 255;
        this.a = a;

		return this;
    }

    fromScalar(scalar: number, a = 1) {
        this.r = scalar;
		this.g = scalar;
        this.b = scalar;
        this.a = a

		return this;
    }

    fromString(str: string, a = 1) {
        if (str in ColorName) {
            return this.fromHex(ColorName[str]);
        }
        this.a = a;
    }

    toJson() {
        return {
            r: this.r,
            g: this.g,
            b: this.b,
            a: this.a
        };
    }
}