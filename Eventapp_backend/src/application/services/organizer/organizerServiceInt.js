

const organizerServiceInt = (repository) => {

  const generateAccessToken = (user) => repository.generateAccessToken(user);
  const generatRefreshToken = (userId) => repository.generatRefreshToken(userId)
  const bcryptpassword = (password) => repository.bcryptpassword(password)
  const comparePassword = (password, hashPassword) => repository.comparePassword(password, hashPassword)


  return {
    generateAccessToken,
    generatRefreshToken,
    
    bcryptpassword,
    comparePassword


  }
}

export default organizerServiceInt
