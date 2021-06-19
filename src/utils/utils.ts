import {Movie} from "../entity/Movie";

const jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer');

export const decodeToken = (token:string) => {
    try{
        let srtToken = token.split(' ').pop()
        return jwt.verify(srtToken,'someString')
    }catch (e) {
        return undefined
    }
}

export const removeMovieFromList = (movies:Array<Movie>,movieToRemove:number) => {
    var newListMovie:Array<Movie> = [];

    for(let movie of movies){
       if(movie.id !== movieToRemove)
           newListMovie.push(movie)
    }

    return newListMovie
}

export const sendMailWelcome = (emailTo:string) => {
    let transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "0af05e1c1fe3d8",
            pass: "f81841b4a85442"
        }
    });

    let mailOptions = {
        from: '"Holaa" <from@example.com>',
        to: emailTo,
        subject: 'Bienvenido al Equipo',
        text: 'Hey Bienvenido al sistema',
        html: '<b>Hey Bienvenido! </b><br> Ya puedes acceder al sistema<br />',
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });

}
