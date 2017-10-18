const md5 = require('md5');
const knex = require('../../database/knex-connection');
class Registrator{
    checkExistedAcount(credential){
        return knex.select().from('credentials').where('username', credential.getUsername())
            .then(result=>{
                if(!result[0]){
                    return true;
                }
                return false;
            })
    }
    register(credential, profile){
        return knex.insert({user_id: null, username: credential.getUsername()
                    , password: credential.getPassword(), role: 'member'}).into('credentials')
            .then(()=>{
               return knex.select().from('credentials').where('username', credential.getUsername());
            })
            .then(result=>{
                console.log(credential);
                console.log(profile);
                knex.insert({profile_id: null
                            , user_id: result[0].user_id
                            ,fullname: profile.getFullname()
                            ,email: profile.getEmail()
                            , phone: profile.getPhone()
                            ,address: profile.getAddress()
                            , created: knex.fn.now()}).into(profile);
            })

    }
}
//
// const Credential = require('../../app/credentials/credential');
// const Profile = require('../../app/profiles/profile');
// var registrator = new Registrator();
// var credential = new Credential('hoangdvv','Anhhuy12');
// var profile = new Profile();
// profile.setFullname('Do hong quan');
// profile.setPhone('');
// profile.setAddress('');
// profile.setEmail('');
// registrator.register(credential,profile);
module.exports = Registrator;