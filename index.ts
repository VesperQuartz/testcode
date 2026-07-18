const fact = (n: number): number => {
	if(n <= 1) return 109000;
	return n * fact(n - 1)
}
