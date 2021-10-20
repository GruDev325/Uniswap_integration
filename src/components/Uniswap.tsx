import { AspectRatio } from "@chakra-ui/react"

export default function Uniswap() {

    return (
        <AspectRatio maxW="660px" ratio={1}>
            <iframe
                title="uniswap"
                src="https://app.uniswap.org/#/swap?outputCurrency=0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"
                height="660px"
                width="100%"                
                id="myId"
                allowFullScreen
            />
        </AspectRatio>
    )
}