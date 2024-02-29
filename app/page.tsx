'use client'
import { Link } from '@chakra-ui/next-js'
import { Button } from '@chakra-ui/react'

import ContainerQuiz from "./components/ContainerQuiz"; 



export default function Home() {
  return (
    <>
    

    <Button colorScheme='green'>Button</Button> 
    <ContainerQuiz /> 
    <button className=" p-6 bg-blue-500 text-sky-500 dark:text-sky-400">
      Sarah Dayan
    </button>
      
    </>
  );
}


