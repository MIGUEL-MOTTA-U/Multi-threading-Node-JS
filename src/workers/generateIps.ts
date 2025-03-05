import GeneratorIPs from "../services/GeneratorIPs.js";
// This function is used to generate a list of IPs
// This proves there is no need to specify the name of the default export
export default (data: DataSearch): string[] => {
	const start = data.start;
	const end = data.end;
	const generator = new GeneratorIPs(start, end);
	return generator.run();
};

interface DataSearch {
	start: number;
	end: number;
}
