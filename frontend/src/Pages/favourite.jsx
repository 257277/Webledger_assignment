import React, { useEffect, useState } from "react";
import {Heading,Center,Grid,GridItem,Card,CardBody,Image,Stack,Spinner} from "@chakra-ui/react"
import style from "../Pages/favourite.module.css"
import Navbar from "./navbar";
export default function Favourite()
{

    const [data,setdata]=useState([]);
  const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        async function getdata() {
          const email = JSON.parse(sessionStorage.getItem("email"));
          const url = `http://127.0.0.1:3333/favourite/${email}`;
          try {
            const res = await fetch(url);
    
            if (res.ok) {
              const r = await res.json();
              console.log(r.favoriteRecipes);
              setdata(r.favoriteRecipes);
            } else {
              console.log("Response not OK:", res);
            }
          } catch (error) {
            console.error("An error occurred:", error);
          }
          finally {
                setIsLoading(false);
              }
        }
        getdata();
      }, []);
    return (
        <div>
            <Navbar/>
            <Center height='50px'></Center>
        <Heading color={"blue.600"}>Favourite Recipes</Heading>
        <Center height='50px'></Center>
        {isLoading ? (
               <div><Spinner
               thickness='4px'
               speed='0.65s'
               emptyColor='gray.200'
               color='blue.500'
               size='xl'
             /></div>
      ) :(
        <div className={style.recipes}>
  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' }} gap={10}>
    {data?.map((item) => (
      <GridItem key={item.id}>
        <Card maxW='sm'>
          <CardBody>
            <Image
              src={item.image}
              alt='recipe image'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md'>{item.title}</Heading>
            </Stack>
          </CardBody>
        </Card>
      </GridItem>
    ))}
  </Grid>
</div>
      )}
        </div>
    )
}