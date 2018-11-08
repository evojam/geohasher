const BASE32 = '0123456789bcdefghjkmnpqrstuvwxyz'

export const toBase32 = (char: string): number =>
  BASE32.indexOf(char)
