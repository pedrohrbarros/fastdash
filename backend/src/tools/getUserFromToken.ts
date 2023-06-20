import jwt, { type JwtPayload } from 'jsonwebtoken'

export const getIDFromToken = async (bearer: string): Promise<string> => {
  const token: string = bearer.split(' ')[1]
  const { id } = jwt.verify(token, process.env.JWT_PASSWORD ?? '') as JwtPayload
  return id.toString()
}
