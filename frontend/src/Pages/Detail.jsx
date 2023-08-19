import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import style from "../Pages/Detail.module.css";
import { Center, Heading, Divider,Image,Flex,TableContainer,Table,Thead,Tr,Th,Td,Tfoot,Tbody,Grid,Card,CardBody,Text,Spinner } from "@chakra-ui/react";
import Navbar from "./navbar";
export default function Detail() {
    const [data, setdata] = useState([]);
    const [ingredient, setingredient] = useState([]);
    const [nutition, setnutition] = useState([]);
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        async function getdata(id) {
            let url = `http://127.0.0.1:3333/detail/${id}`;
            try{
            let res = await fetch(url);
            if (res.ok) {
                let r = await res.json();
                setdata(r);
                setingredient(r.extendedIngredients)
                setnutition(r.nutrition.nutrients)
            }
        }
            catch(err)
            {
                alert('Error fetching data:', err);
            }
            finally {
                setIsLoading(false);
              }
            
        }
        getdata(id);
    }, []);

    return (
        <div>
            <Navbar/>
            <Center height="30px">
                <Divider />
            </Center>

            <Heading color={"blue.600"}>Details</Heading>

            <Center height="30px">
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
            <div className={style.title}>
                <Heading color={"blue.600"}>{data.title}</Heading>
                <Center height="30px">
            </Center>
                <Flex width={"90%"} margin={"auto"}>
                <Image
                    src={data.image}
                    alt='recipe image'
                    borderRadius='lg'
                    marginRight={"30px"}
                />
                <div>
                <p dangerouslySetInnerHTML={{ __html: data.summary }}></p>
             
                </div>
                </Flex>
                <Center height="30px">
                <Divider />
            </Center>
            <Heading color={"blue.600"}>Nutrition</Heading>
            <Center height="30px">
            </Center>
            <TableContainer>
  <Table variant='simple' width={"70%"} margin={"auto"} size='lg'>
    <Thead>
      <Tr >
        <Th>Name</Th>
        <Th>Amount</Th>
        <Th >Unit</Th>
        <Th>Percent Of Daily Needs</Th>
      </Tr>
    </Thead>
    <Tbody>
     
      {nutition?.map((item)=>
      {
       return (
        <Tr>
        <Td>{item.name}</Td>
        <Td>{item.amount}</Td>
        <Td>{item.unit}</Td>
        <Td>{item.percentOfDailyNeeds}</Td>
        </Tr>
       )
        
      })}
    </Tbody>
    <Tfoot>
    <Tr>
        <Th>Name</Th>
        <Th>Amount</Th>
        <Th >Unit</Th>
        <Th>Percent Of Daily Needs</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>
<Center height="30px">
                <Divider />
            </Center>
            <div>
            <Heading color={"blue.600"}>Ingredients</Heading>
            <Center height="30px">
                <Divider />
            </Center>
            <div>
            <Center height="30px">
            </Center>
            <Grid templateColumns='repeat(4, 1fr)' gap={10}>
        {ingredient?.map((item) => {
            return (
                <Card maxW='sm'>
                    <CardBody>
                        <Heading size='md'>{item.name}</Heading>
                        <Text>Amount: {item.original}</Text>
                    </CardBody>
                </Card>
            );
        })}
    </Grid>
            </div>
            </div>
</div>
      )}
        </div>
    );
}
