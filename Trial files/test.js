function roughScale(x, base) {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) { return 0; }
    return parsed / 1000000000000000000;
  }
  
  console.log(roughScale(' 0xacc8b79d8f0fc5', 16));

