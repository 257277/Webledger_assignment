import React, { useEffect, useState } from 'react';
import { Input, Button, Flex, Center, Heading, Divider, Card, CardBody, Image, Stack, CardFooter, Grid, GridItem, Select, FormLabel, Switch, ButtonGroup,Spinner } from "@chakra-ui/react";
import style from "../Pages/home.module.css"
import { Link } from 'react-router-dom';
import Navbar from "../Pages/navbar";
export default function Home() {
    const [firstclick, setFirstClick] = useState(false);
    const [data, setdata] = useState([]);
    const [click, setclick] = useState(false);
    const [recipe, setrecipe] = useState("");
    const [sortOrder,setsortOrder]=useState("");
    const [diet,setdiet]=useState("");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            let url = `http://127.0.0.1:3333/food/${recipe}`;
            if(sortOrder!=="")
            {
                url+=`?sort=calories&sortDirection=${sortOrder}`
            }
            if(diet!=="" && sortOrder=="")
            {
                url+=`?diet=vegetarian`
            }
            else if(diet!=="" && sortOrder!=""){
                url+=`&diet=vegetarian`
            }
            try {
                let res = await fetch(url);
                if (res.ok) {
                  let r = await res.json();
                  setdata(r.results);
                }
              } catch (error) {
                alert('Error fetching data:', error);
              } finally {
                setIsLoading(false); 
              }
        }

        if (click) {
            fetchData();
            setclick(false);
        }
    }, [click]);

        

  async function addFavourite(item)
  {
    try{
    let user=JSON.parse(sessionStorage.getItem("email"));
     let data={email:user,id:item.id,title:item.title,image:item.image};

     let url="http://127.0.0.1:3333/addfavourite";
     const res=await fetch(url,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
     })
     if(res.ok)
     {
        let r=await res.json();
        alert(r.msg);
     }
     else{
        alert("Someting went wrong, Please try again");
     }
    }
    catch(err)
    {
        alert("Someting went wrong, Please try again");
    }
  }



    return (
        <div>
        <div>  <Navbar /></div>
      
        <div className={style.container}>
           
            <Center height='50px' size='lg'></Center>
            <Heading color={"blue.600"}>Recipe</Heading>
            <Center height='50px'></Center>
            <Flex alignItems='center' justifyContent={"space-around"}  direction={{ base: "column", md: "row" }}  wrap={{ base: "nowrap", md: "wrap" }}>
                <Input placeholder='Search Recipe' width={{ lg: "50%", md: "100%", sm: "100%" }} fontSize={"20px"} onChange={(e) => setrecipe(e.target.value)} marginBottom={{md:"20px",sm:"20%"}} />
                <Button colorScheme='blue' onClick={() => { setclick(true); setFirstClick(true); }} marginTop={{lg:"-3%"}}>Search</Button>
            </Flex>
            <Center height='50px'>
                <Divider />
            </Center>
            {isLoading ? (
               <div><Spinner
               thickness='4px'
               speed='0.65s'
               emptyColor='gray.200'
               color='blue.500'
               size='xl'
             /></div>
      ) :(
            <div className={style.body}>
              
                {firstclick && (
                    <div className={style.filter}>
                        <Heading>Filter</Heading>
                        <Center height='30px'>
                            <Divider />
                        </Center>
                        <Select placeholder='Sort Calories' onChange={(e)=>
                        {
                           if(e.target.value==="max-to-min")
                           {
                            setsortOrder("desc")
                           }
                           else if(e.target.value==="min-to-max")
                           {
                            setsortOrder("asc")
                           }
                           else{
                            setsortOrder("")
                           }
                        }}>
                            <option value='max-to-min'>Max-to-Min</option>
                            <option value='min-to-max'>Min-to-Max</option>
                        </Select>
                        <Center height='30px'>
                            <Divider />
                        </Center>
                        <Flex columns={{ base: 2, lg: 4 }}>
                            <FormLabel htmlFor='isChecked'>Vegetarian</FormLabel>
                            <Switch id='isChecked' marginTop={"3%"} onChange={(e)=>
                            {
                               if(e.target.checked)
                               {
                                setdiet('vegetarian');
                               }
                               else{
                                 setdiet("");
                               }
                               
                            }}/>
                        </Flex>
                      
                    </div>
                )}

                <div>
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
                                    <Divider />
                                    <CardFooter>
                                    <ButtonGroup spacing='20'>
                                        <Button  colorScheme='blue' onClick={()=>
                                        {
                                           addFavourite(item);
                                        }}>
                                            Add to Favorite
                                        </Button>
                                        <Button colorScheme='blue'>
                                                <Link to={`/detail/${item.id}`}>Details</Link>
                                            </Button>
                                        </ButtonGroup>
                                    </CardFooter>
                                </Card>
                            </GridItem>
                        ))}
                    </Grid>
                </div>
            </div>
      )}
        </div>
      
        </div>
    )
}
