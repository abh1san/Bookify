const jwt = require('jsonwebtoken')


const db = require('./db');

const getAllBooks = () => {

  return db.Book.find().then((result) => {
    if (result) {
      return {
        status: true,
        statusCode: 200,
        Products: result
      }
    }
    else {
      return {
        status: false,
        statusCode: 402,
        message: 'Book not found'
      }
    }
  }
  )
}

const register = (acno, username, pass) => {
  return db.User.findOne({ acno })
    .then(User => {
      if (User) {
        return {
          statuscode: 401,
          status: false,
          message: 'User already registered'
        }
      }
      else {
        const newUser = new db.User({
          acno,
          username,
          pass
        })
        newUser.save()
        return {
          statuscode: 200,
          status: true,
          message: 'Successfully registered'
        }
      }
    })


}


const login = (acno, pswd) => {
  return db.User.findOne({
    acno,
    pass: pswd
  })
    .then(User => {
      if (User) {
        currentUser = User.username;
        currentacno = acno;
        //token generate
        const token = jwt.sign({ currentacno: acno }, 'superkey2020')
        return {
          statusCode: 200,
          status: true,
          message: 'Login Successfully',
          currentUser,
          currentacno,
          token
        }

      }
      else {

        return {
          statusCode: 401,
          status: false,
          message: 'incorrect password or username'
        }
      }
    })
}

module.exports = {
  getAllBooks, register, login
}