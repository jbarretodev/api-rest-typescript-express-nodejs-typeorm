const jwt = require('jsonwebtoken')


export const decodeToken = (token) => {
    try{
        return jwt.verify(token,'someString')
    }catch (e) {
        return undefined
    }
}
