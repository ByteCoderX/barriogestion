export class JWT {
  constructor(
    public readonly rId: string,
    public readonly tokenExpirationNow: number,
    public readonly tokenExpirationOffset: number,
    public readonly userId: string
  ) {}
}

// El diablo