const mongoose=require('mongoose')

function connection(url) {
    mongoose.connect(url)
        .then((e ) => {
          console.log("Mongodb Connected");
        }
        )
        .catch((error) => {
          console.log('Got the error please check below\n' +error);
        }
        )
}
module.exports={connection};