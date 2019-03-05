const nodemailer = require('nodemailer');
const ejs = require("ejs");
let smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'vikram@amoha.co',
       // pass: 'cwcsmrnbtksxpcch'
       pass: 'kumar123'
    }
};
let transporter = nodemailer.createTransport(smtpConfig);
let server_url = 'https://reactshop.amoha.co:5000';
let site_logo = server_url+"/tshirtshop.6ce31d30.png";
let product_image = server_url+"/order/images/afghan-flower-2.4b9cd23f.gif";
exports.orderEmail = function(order_data, to_email){
    ejs.renderFile(__dirname + "/templates/order/email_template.ejs", {'order_info':order_data, 'logo':site_logo, 'product_image':product_image}, function (err, data) {
    if (err) {
        console.log(err);
    } else {        
        var mainOptions = {
            from: '"TShirtShop" vikram@amoha.co',
            to: to_email,
            subject: 'Order Information',            
            html: data            
        };        
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });       
    }
    });
}