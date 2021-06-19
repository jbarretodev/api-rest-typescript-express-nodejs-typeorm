const jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer');

export const decodeToken = (token) => {
    let srtToken = token.split(' ').pop()
    return jwt.verify(srtToken,'someString')
}


export const sendMailWelcome = (emailTo) => {
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
