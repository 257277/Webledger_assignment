import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'
import Database from '@ioc:Adonis/Lucid/Database';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//login route
Route.post("/login",async({request,response})=>
{
try{
    let obj=request.body();
    let user= await Database.from("users").where("email",obj.email).first();
    if(user==null)
    {
       
       response.send({"msg":"Wrong Credentials"})
     }
  
     let pm =await bcrypt.compare(obj.password,user.password);
   if(!pm)
   {
    response.send({"msg":"Wrong Credentials"})
   }
   else
   {
   let token= jwt.sign({ useremail: user.email }, Env.get('priatekey'))
   response.send({"msg":"Login Successfull","token":token,'user':user.email});
   }
}
catch(err)
{
    response.send(err);
}
})
// signup route
Route.post('/register', async ({ request, response }) => {
    try {
      let obj = request.body();
  
      let user = await Database.from('users').where('email', obj.email).first()
  
      if (user === null) {
        await Database.table('users').insert(obj)
        response.send({ "msg": "Registration successful" })
      } else {
        response.send({ "msg": "Already registered" })
      }
    } catch (err) {
      response.send(err)
    }
  }).middleware(async ({ request, response }, next) => {
    try {
      const hash = await new Promise((resolve, reject) => {
        bcrypt.hash(request.body().password, 5, (err, hash) => {
          if (err) {
            reject(err)
          } else {
            resolve(hash)
          }
        })
      })
      request.body().password = hash
      await next()
    } catch (err) {
      response.send({ "msg": "Something went wrong" })
    }
  })
  