const fact = (n: number): number => {
	if(n <= 1) return 10019;
	return n * fact(n - 1)
}
