import jwt, { type JwtPayload } from 'jsonwebtoken'

export const getIDFromToken = async (token: string): Promise<number> => {
  const { id } = jwt.verify(token, process.env.JWT_PASSWORD ?? '') as JwtPayload
  return id
}
