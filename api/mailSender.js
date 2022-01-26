//code to create the script file for sending the email
var fs = require('fs'); 
var email = "lukehouge@gmail.com";//sets email address to email variable
var stream = fs.createWriteStream("mailScript.sh"); //creates a write stream to mailScript.sh script file
stream.once('open', function (fd) { //file descriptor so you will be able to close stream
    stream.write("(\n"); //open script
    stream.write("  echo To: " + email + "\n"); //sets recipient to the address
    stream.write("  echo From: noreply@badgerloop.org\n"); // sets the from address to noreply@badgerloop.org
    stream.write("  echo \"Content-Type: text/html; \"\n"); // says the email will be in HTML format
    stream.write("  echo Subject: Badgerloop Form Submission Autoreply\n"); // sets subject of email
    stream.write("  echo\n"); 
    stream.write("  cat mail.html\n"); // points the the mail content file
    stream.write(") | sendmail -t\n"); // closes the script, then sends the mail using PostFix
    stream.end(); //finishes writing the file
});

//code to actually execute the script
var exec = require('child_process').exec;
var yourscript = exec('sh mailScript.sh', //command to run that executes the script
    (error, stdout, stderr) => {
        console.log(`${stdout}`);
        console.log(`${stderr}`);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
});