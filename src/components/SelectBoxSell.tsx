/* eslint-disable */
import React, { useCallback } from "react";
import debounce from 'lodash.debounce';
import SelectAssetsNew from "./SelectAssetsNew";

import { Input, InputRightElement, InputGroup, Text} from "@chakra-ui/react";
export interface Item {
  label: string;
  value: string;
}

export default function SelectBoxSell({ tokens, swapTotle, handleChangeSource }: { tokens: any , swapTotle: any, handleChangeSource: any} ) {
  const [value, setValue] = React.useState("");  

  const changeHandler = (event: any) => {
    const { value: nextValue } = event.target;
    setValue(nextValue);
    swapTotle(nextValue);
  };

  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 1000)
  , []);
  
  return (
    <>
      <Text mb="8px" color="blue.300">Sell</Text>
      <InputGroup width="400px">        
        <Input type="number" min="0.000000000000000000" color="blue.300" placeholder="Enter amount" value={value} onChange={(event:any) => {
          const { value: nextValue } = event.target;
          setValue(nextValue);
          debouncedChangeHandler(event);          
        }}
        />
        <InputRightElement zIndex="10" width="150px" children={<SelectAssetsNew tokens={tokens} handleChange={handleChangeSource}/>} />
      </InputGroup>
    </>
  );
}
