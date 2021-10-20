/* eslint-disable */
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import SelectBoxSell from "./components/SelectBoxSell";
import SelectBoxBuy from "./components/selectBoxBuy";
import axios from 'axios';

import { ChakraProvider, useDisclosure, Text, Box } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { SetStateAction, useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import "@fontsource/inter";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tokens, setTokens] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [value, setValue] = useState("");
  const [rate, setRate] = useState("");
  const [usdSrc, setUsdSrc] = useState("");
  const [usdDest, setUsdDest] = useState("");
  const [gas, setGas] = useState("");
  const { activateBrowserWallet, account } = useEthers();
  const [type, setType] = useState("");

  const getTokens = () => {
    axios.get(`https://api.totle.com/tokens`)
      .then((res) => {
        setTokens(res.data.tokens);
      });
  }

  useEffect(() => {
    getTokens();
  }, []);

  useEffect(() => {
    if (value && source && destination) {
      swapTotle(value, source, destination, account, type);
    }
  }, [source, destination, value, account, type])

  const handleChangeSource = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const token = tokens.map((item, index) => {
      if (item['symbol'] == event) {
        setSource(item['address'])
      }
      return;
    });
  }

  const handleChangeDestination = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const token = tokens.map((item, index) => {
      if (item['symbol'] == event) {
        setDestination(item['address'])
      }
      return;
    });
  }

  const swapTotle = (value: any, source: any, destination: any, account: any, type: any) => {
    try {
      let sourceAmount = value * Math.pow(10, 18);

      let request_body = {
        "swaps": [
          {
            "destinationAsset": destination,
            "maxExecutionSlippagePercent": 3,
            "sourceAmount": sourceAmount,
            "sourceAsset": source,
          }
        ],
        "config": {
          "strategy": {
            "main": "curves",
            "backup": "curves"
          },
          "skipBalanceChecks": false,
          "transactions": false
        },
        "apiKey": "f1bfe0b7-1e68-4731-b549-2de05448e0a0",
        "address": ""
      };

      if (type == "second") {
        request_body.config.skipBalanceChecks = true;
        request_body.config.transactions = true;
        request_body.address = account;
      }
      
      let req_src = { "tokenAddress": source };
      let req_dest = { "tokenAddress": destination}
      let tmpDest: number;

      axios.post(`https://api.totle.com/usd-rate`, req_src).then((res)=>{
        let tmpSrc = res.data * value;
        setUsdSrc(tmpSrc.toString());
      });

      axios.post(`https://api.totle.com/usd-rate`, req_dest).then((res)=>{
        tmpDest = res.data;        
      });

      axios.post(`https://api.totle.com/swap`, request_body
      ).then((res) => {
        if (res.data.success) {
          let rate = res.data.response["summary"][0]["rate"] * value;
          setRate(rate.toString());
          
          let Dest = tmpDest * rate
          setUsdDest(Dest.toString());

          if (type == "second") {
            let gas = res.data.response["transactions"][0]["tx"]["gas"];
            let gasToeth = gas / Math.pow(10, 9);
            setGas(gasToeth.toString());
          }

        } else {
          let error = res.data.response["info"];
          alert(error)
          console.log(res)
        }
      });
    } catch (error) {
      alert(error)
      console.log(error)
    }
  }

  const changeType = (value: string) => {
    setType(value);
  }

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Stack spacing={4}>
        <Box backgroundImage="url('/logo.png')" backgroundPosition="center" backgroundRepeat="no-repeat" w="300px" h="100px" p={4} color="white" />       
        <ConnectButton handleOpenModal={onOpen} changeType={changeType} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
        </Stack>
        <Stack spacing={4}>
          <SelectBoxSell tokens={tokens} swapTotle={setValue} handleChangeSource={handleChangeSource} />
          <Text color="white" fontSize="md">
            USD: {usdSrc}
          </Text>
          <SelectBoxBuy tokens={tokens} handleChangeDestination={handleChangeDestination} rate={rate} />
          <Text color="white" fontSize="md">
            USD: {usdDest}
          </Text>
          <Text color="white" fontSize="md">
            GAS Fee: {gas}   ETH
          </Text>
        </Stack>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
