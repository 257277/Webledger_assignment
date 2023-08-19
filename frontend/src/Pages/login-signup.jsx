import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement, Button, Divider, Center, Stack } from '@chakra-ui/react';
import Styles from "../Pages/login-signup.module.css";
import Navbar from './navbar';
import { useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  async function handleLogin() {
    const loginData = {
      email: loginEmail,
      password: loginPassword
    };

    try {
      const res = await fetch(`http://127.0.0.1:3333/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      if (res.ok) {
        const data = await res.json();

        const {token} = data;
        sessionStorage.setItem("token", JSON.stringify(token));
        sessionStorage.setItem("email", JSON.stringify(data.user));
        alert(data.msg);
        navigate("/home");
      } else {
        const errorData = await res.json();
        alert(errorData.msg); 
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  }

  async function handleRegister() {
    const registerData = {
      name: registerName,
      email: registerEmail,
      password: registerPassword
    };

    try {
      const res = await fetch(`http://127.0.0.1:3333/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerData)
      });

      if (res.ok) {
        const data = await res.json();
        alert(data.msg);
      } else {
        const errorData = await res.json();
        alert(errorData.msg);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  }

  return (

    <div>
      <Navbar/>
      <Center height='100px'>
        <Divider />
      </Center>
      <div className={Styles.container}>
        <Tabs isFitted variant='enclosed'>
          <TabList>
            <Tab className={Styles.tab}>LogIn</Tab>
            <Tab className={Styles.tab}>SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <form>
                <Stack spacing={4}>
                  <Input
                    placeholder='Enter Email'
                    size='lg'
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    fontSize={{ base: "12px", md: "20px" }}
                  />
                  {PasswordInput(loginPassword, setLoginPassword)}
                  <Button colorScheme='blue' size='lg' onClick={handleLogin}>
                    Login
                  </Button>
                </Stack>
              </form>
            </TabPanel>
            <TabPanel>
              <form>
                <Stack spacing={4}>
                  <Input
                    placeholder='Enter Name'
                    size='lg'
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    fontSize={{ base: "12px", md: "20px" }}
                  />
                  <Input
                    placeholder='Enter Email'
                    size='lg'
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    fontSize={{ base: "12px", md: "20px" }}
                  />
                  {PasswordInput(registerPassword, setRegisterPassword)}
                  <Button
                    colorScheme='blue'
                    size='lg'
                    onClick={handleRegister}
                  >
                    Signup
                  </Button>
                </Stack>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      <Center height='100px'>
        <Divider />
      </Center>
    </div>
  );
}

function PasswordInput(value, setValue) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        fontSize={{ base: "12px", md: "20px" }}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
