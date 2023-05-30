import validator from 'validator'

export const passwordValidator = (password: string):number => {
  const passwordScore = validator.isStrongPassword(password, {
    minLength: 8,
    returnScore: true,
    pointsPerUnique: 0.5,
    pointsPerRepeat: 0,
    pointsForContainingLower: 1,
    pointsForContainingUpper: 3,
    pointsForContainingNumber: 1.5,
    pointsForContainingSymbol: 4
  })
  return passwordScore
}