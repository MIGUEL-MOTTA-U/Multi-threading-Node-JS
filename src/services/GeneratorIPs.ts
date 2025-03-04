import { randomInt } from "node:crypto";

class GeneratorIPs{
    private ips: string[];
    private start: number;
    private end: number;

    constructor(start:number, end:number){
        this.ips = [];
        this.start = start;
        this.end = end;
    }

    public run(): string[]{
        return this.generateIPs();
    }

    private generateIPs(): string[]{
        for(let i = this.start; i <= this.end; i++){
            const ip = `${randomInt(0,255)}.${randomInt(0,255)}.${randomInt(0,255)}.${randomInt(0,255)}`;
            this.ips.push(ip);
        }
        return this.ips;
    }
}
export default GeneratorIPs;