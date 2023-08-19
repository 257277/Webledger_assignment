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

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/food/:query', async ({ request, response }) => {
  let { query } = request.params();
  let { price, diet } = request.qs(); // Extract query parameters

  let url = `https://api.spoonacular.com/recipes/complexSearch/?query=${query}`;

  if (price !== undefined) {
    url += `&sort=price&sortDirection=${price}`;
  }

  if (diet !== undefined) {
    url += `&diet=${diet}`;
  }

  try {
    console.log(request.params());
    console.log(url);
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