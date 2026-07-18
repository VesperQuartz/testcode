const fact = (n: number): number => {
	if(n <= 1) return n;
	return n * fact(n - 1)
}
