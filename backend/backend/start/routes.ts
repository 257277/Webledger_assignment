/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/


import Route from '@ioc:Adonis/Core/Route'
import "../Routes/userRoutes"
import axios from 'axios'
import Database from '@ioc:Adonis/Lucid/Database'
// testing route
Route.get('/', async () => {
  return { hello: 'world' }
})
// Recipe Search Route
Route.get('/food/:query', async ({ request, response }) => {
  let { query } = request.params();
  let { sort,sortDirection, diet } = request.qs(); 
  let url = `https://api.spoonacular.com/recipes/complexSearch/?query=${query}`;

  if (sort !== undefined) {
    url += `&sort=${sort}&sortDirection=${sortDirection}`;
  }

  if (diet !== undefined) {
    url += `&diet=${diet}`;
  }

  try {
 
    let data = await axios.get(url, {
      headers: {
        'x-api-key': '433a7d0c5d6a4ac89adea1b1b067d92c'
      }
    });

    response.send(data.data);
  } catch (err) {
    console.error(err);
    response.status(500).send('An error occurred while fetching data.');
  }
})

// Recipe Detail Route
Route.get("/detail/:id",async({request,response})=>
{
  const { id } = request.params();
  let url=`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true`
  try{
    let data=await axios.get(url,
      {
        headers: {
          'x-api-key': '433a7d0c5d6a4ac89adea1b1b067d92c'
        }
      });
      response.send(data.data);
  }
  catch(err)
  {
    response.send("Something went wrong");
  }
})
//Recipe add to favourite route
Route.post("/addfavourite",async({request,response})=>
{
  let data=request.body();
  try{
    let dt=await Database.from("favourite").where("title",data.title).first();
    if(dt==null)
    {
    await Database.table("favourite").insert(data);
    response.send({"msg":"Successfully added"});
    }
    else{
      response.send({"msg":"Already added"});
    }
  }
  catch(err)
  {
    response.send({"err":err,"msg":"Something wents wrong"});
  }

})
// Retrieval of Favourite Recipe Route
Route.get("/favourite/:email", async ({ request, response }) => {
  try {
    const { email } = request.params();
 
    const favoriteRecipes = await Database.from("favourite").select("*").where("email", email);
    response.send({ favoriteRecipes });
  } catch (err) {
 
    console.error(err);
    response.send("Something went wrong");
  }
});

