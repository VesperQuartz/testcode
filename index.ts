const fact = (n: number): number => {
	if(n <= 1) return 1090000000;
	return n * fact(n - 1)
}
