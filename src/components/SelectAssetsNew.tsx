import React, { useEffect } from 'react'
import {
  Avatar,
  Text,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

export default function SelectAssetsNew({ tokens, handleChange }: { tokens: any, handleChange: any}) {
  const [symbol, setSymbol] = React.useState("");
  const [icon, setIcon] = React.useState("")
  const getSelectedSymbol = (e: any) => {
    setSymbol(e)
  }

  useEffect(() => {
    tokens.map((tokens:any, oid: any) => {
      if(tokens.symbol === symbol){
        setIcon(tokens.iconUrl);
      }
      return setIcon;
    });
  }, [symbol, tokens])

  return (
    <>
      <AutoComplete
        openOnFocus
        onChange={(e) => {
          getSelectedSymbol(e);
          handleChange(e);
        }}
      >
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="blue.300"
            fontSize="1.2em"
            children={<Avatar size="sm" name={tokens.address} src={icon? icon: "../default.png"} variant="filled" />}
          />
          <AutoCompleteInput variant="filled" />
        </InputGroup>
        <AutoCompleteList>
          {tokens.map((tokens: any, oid: any) => (
            <AutoCompleteItem
              key={`option-${oid}`}
              value={tokens.symbol}
              textTransform="capitalize"
              align="center"
            >
              <Avatar size="sm" name={tokens.address} src={tokens.iconUrl} />
              <Text ml="4">{tokens.symbol}</Text>
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </>
  );
}
