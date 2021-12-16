let MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://nikithapreetham:nikki@cluster0.7wlks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
async function insertUserRepos(userRepos) {
    MongoClient.connect(uri, function(err, client) {
        if (err) throw err;
        const db = client.db('gitApiDB');
        const db_collection = db.collection('userRepos');
        if(userRepos != null){
            for(let i=0; i < userRepos.length; i++) {
                checkAndUpdateUserExistence(userRepos[i])
            }
        }
    });
}
async function checkAndUpdateUserExistence(userObj){
    MongoClient.connect(uri, function(err, client) {
        if (err) throw err;
        const db = client.db('gitApiDB');
        const db_collection = db.collection('userRepos');
        if(db_collection.find({name: userObj.name})){
            // Unlikely to find duplicate usernames but just in case
            db_collection.updateMany({name:userObj.name},{$set: userObj}, function(err,res) {
                if (err) throw err;
                console.log("Document updated")
                client.close()
            });
            return "Existing user updated"
        }
        else{
            db_collection.insertOne(userObj, function (err, res) {
                if (err) throw err;
                console.log("Document inserted");
                client.close()
            });
            return "New user added"
        }
    });
}
//async function refreshUserRepoDB(){}

