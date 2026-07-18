const fact = (n: number): number => {
	if(n <= 1) return 19;
	return n * fact(n - 1)
}
