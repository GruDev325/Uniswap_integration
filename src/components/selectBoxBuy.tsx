/* eslint-disable */ 
import React from "react";
import SelectAssetsNew from "./SelectAssetsNew";

import { useEffect, useState } from "react";
import { Input, InputRightElement, InputGroup, Text} from "@chakra-ui/react";

export default function SelectBoxBuy( { tokens, handleChangeDestination, rate }:{ tokens:any, handleChangeDestination: any, rate: any } ) {
   return (
    <>
      <Text mb="8px" color="blue.300">Buy</Text>
      <InputGroup width="400px">        
        <Input type="number" min="0.000000000000000000" color="blue.300" placeholder="Enter amount" value={rate}/>
        <InputRightElement width="150px" children={<SelectAssetsNew tokens={tokens} handleChange={handleChangeDestination}/>} />
      </InputGroup>
    </>
  );
}
