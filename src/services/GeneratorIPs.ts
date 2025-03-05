import { randomInt } from "node:crypto";

class GeneratorIPs {
	private start: number;
	private end: number;

	constructor(start: number, end: number) {
		this.start = start;
		this.end = end;
	}

	public run(): string[] {
		return this.generateIPs();
	}

	private generateIPs(): string[] {
		const result: string[] = [];
		for (let i = this.start; i <= this.end; i++) {
			const ip = `${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(0, 255)}`;
			result.push(ip);
		}
		return result;
	}
}
export default GeneratorIPs;
