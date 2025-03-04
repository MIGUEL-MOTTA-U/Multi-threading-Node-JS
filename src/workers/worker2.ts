function worker2(name: string): void {
	for (let i = 0; i < 1000; i++) {
		console.log(`This is Worker ${name}: ${i}`);
	}
}
// This time the function is anonymous and it is exported as default
export default (name: string) => {
	worker2(name);
};
