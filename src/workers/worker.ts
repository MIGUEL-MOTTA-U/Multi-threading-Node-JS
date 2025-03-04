function fibonacci(n: number, name: string): number {
	for (let i = 0; i < n * 10; i++) {
		console.log(`We are calculating Fibonacci of ${name} in iteration ${i}`);
	}
	return n;
}
export default function defaultTask(data: unknown): unknown {
	const number = (data as { number: number; name: string }).number;
	const name = (data as { number: number; name: string }).name;
	const result = fibonacci(number, name);
	return { result, timestamp: Date.now() };
}
