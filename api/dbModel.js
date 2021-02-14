const usersdb=require('../data/dbConfig');

module.exports={findUser,getUsers,addUser}

async function findUser({username}){
    console.log('username in dbModel=',username)
const user= await usersdb("users as u")
                .where("u.username",username)
                .first();
return user;
}

async function getUsers(){
    const users= await usersdb("users as u")
                    .select("u.username")
    return users;
    }

async function getUserById(user_id){
const user= await usersdb("users").where("id",user_id)
return user;
}

async function addUser(cred){
    const newUserId= await usersdb("users as u")
                    .insert(cred)
    const newUser= await getUserById(newUserId)
    return newUser
}