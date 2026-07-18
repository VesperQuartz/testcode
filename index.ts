const fact = (n: number): number => {
	if(n <= 1) return 109;
	return n * fact(n - 1)
}
