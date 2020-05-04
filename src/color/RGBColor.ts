import ColorName from "./ColorName";
import IRGBColor from "./interfaces/IRGBColor";

export default class RGBColor implements IRGBColor {
	public static create(r = 0, g = 0, b = 0): RGBColor {
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

	public clone(): RGBColor {
		return new RGBColor(this.r, this.g, this.b);
	}

	public equals(color: IRGBColor): boolean {
		return color.r === this.r && color.g === this.g && color.b === this.b;
	}

	public from(color: IRGBColor): this {
		this.r = color.r;
		this.g = color.g;
		this.b = color.b;

		return this;
	}

	public fromArray(array: ArrayLike<number>, offset = 0): this {
		this.r = array[offset];
		this.g = array[offset + 1];
		this.b = array[offset + 2];

		return this;
	}

	public fromHex(hex: number): this {
		this.r = hex >> 16;
		this.g = (hex >> 8) & 255;
		this.b = hex & 255;

		return this;
	}

	public fromScalar(scalar: number): this {
		this.r = scalar;
		this.g = scalar;
		this.b = scalar;

		return this;
	}

	public fromString(str: string): this {
		if (str in ColorName) {
			return this.fromHex(ColorName[str]);
		}

		return this;
	}

	public set(r = 0, g = 0, b = 0) {
		this.r = r;
		this.g = g;
		this.b = b;

		return this;
	}

	public toJson(): IRGBColor {
		return {
			b: this.b,
			g: this.g,
			r: this.r
		};
	}
}