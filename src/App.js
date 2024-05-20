
import './App.css';
import './styles.css';

import {useState} from 'react';

import * as React from 'react';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import useSize from "./useSize";
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import { Padding } from '@mui/icons-material';




function App() {

  const totalSupply = 1000000000;
  const flatFee = 0.225;
  const variableFee = 0.00063;
  const swiftAnnualVolume = 150000000000000;
  const swiftAnnualTransactions = 365 * 44800000;
  const dtccAnnualVolume = 3000000000000000;
  const dtccAnnualTransactions = 953000000;
  const [linkPrice, setLinkPrice] = useState(16)
  const [circulatingSupply, setCirculatingSupply] = useState(58.71)
  const [stakedSupply, setStakedSupply] = useState(7.664793050587)
  const [amountStaked, setAmountStaked] = useState(1000)
  const [stakerRevenue, setStakerRevenue] = useState(33.33)
  const [ccipFlow, setCcipFlow] = useState(1)

  const circulatingSupplyNum = (totalSupply * circulatingSupply / 100);
  const stakedSupplyNum = (totalSupply * circulatingSupply / 100 * stakedSupply / 100);
  const swiftFlatFee = (swiftAnnualTransactions * flatFee * ccipFlow / 100 * stakerRevenue / 100 / stakedSupplyNum);
  const swiftVariableFee = (swiftAnnualVolume * variableFee * ccipFlow / 100 * stakerRevenue / 100 / stakedSupplyNum);
  const swiftFlatFeeRevenue = (swiftFlatFee * amountStaked);
  const swiftVariableFeeRevenue = (swiftVariableFee * amountStaked);
  const dtccFlatFee = (dtccAnnualTransactions * flatFee * ccipFlow / 100 * stakerRevenue / 100 / stakedSupplyNum);
  const dtccVariableFee = (dtccAnnualVolume * variableFee * ccipFlow / 100 * stakerRevenue / 100 / stakedSupplyNum);
  const dtccFlatFeeRevenue = (dtccFlatFee * amountStaked);
  const dtccVariableFeeRevenue = (dtccVariableFee * amountStaked);
  const totalFlatFeeRevenue = (swiftFlatFeeRevenue + dtccFlatFeeRevenue);
  const totalFlatFeeRevenuInLink = (totalFlatFeeRevenue / linkPrice);
  const totalVariableFeeRevenue = (swiftVariableFeeRevenue + dtccVariableFeeRevenue);
  const totalVariableFeeRevenueInLink = (totalVariableFeeRevenue / linkPrice);
  const flatFeeRewardRate = (swiftFlatFee + dtccFlatFee) / linkPrice * 100;
  const variableFeeRewardRate = (swiftVariableFee + dtccVariableFee) / linkPrice * 100;
  const ffAnnualStakingRewards = stakedSupplyNum * flatFeeRewardRate / 100;
  const vbfAnnualStakingRewards = stakedSupplyNum * variableFeeRewardRate / 100;
  const remainingCirculatingSupply = circulatingSupplyNum - stakedSupplyNum;

  const [vbfAnnualResult, setVbfAnnualResult] = useState (vbfAnnualStakingRewards);
  const [ffAnnualResult, setFfAnnualResult] = useState (ffAnnualStakingRewards);

  const updateVBF = () => {
    if (vbfAnnualStakingRewards < remainingCirculatingSupply) {
      setVbfAnnualResult(vbfAnnualStakingRewards.toLocaleString() + " LINK");
    } else {
      setVbfAnnualResult(vbfAnnualStakingRewards.toLocaleString() + " LINK, that's more than the current circulating supply.");
    }
  }

  const updateFF = () => {
    if (ffAnnualStakingRewards < remainingCirculatingSupply) {
      setFfAnnualResult(ffAnnualStakingRewards.toLocaleString() + " LINK");
    } else {
      setFfAnnualResult(ffAnnualStakingRewards.toLocaleString() + " LINK, that's more than the current circulating supply.");
    }
  }


  const windowsize = useSize();
  //const sliderWidth = windowsize[0]*0.9;
  const sliderWidth = () => {
    if (windowsize[0] <= 550) {
      return windowsize[0]-16;
    } else {
      return 550*0.95;
    }
  }



//STARTS here
const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;






  return (
    <div className="home-container">
      <div className="home-container01">
        <h1 className="home-text">LINKULATOR</h1>
        <div>
        <InfoIcon  aria-describedby={id} color="disabled" fontSize='small' onClick={handleClick}/>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        > 
          <Typography variant="body1" sx={{ p: 1 }}>This is a calculator, not a financial advisor.</Typography>
          <Typography variant="body2" sx={{ p: 1 }}>Data is sourced from:</Typography>

          <Link href="https://docs.chain.link/ccip/billing#network-fee-table" target="_blank" rel="noreferrer" variant="body2" sx={{ p: 1 }}>Chainlink CCIP billing</Link>
          <br></br>
          <Link href="https://www.forbes.com/sites/zennonkapron/2023/05/23/why-swift-remains-indispensable-for-cross-border-payments" target="_blank" rel="noreferrer" variant="body2" sx={{ p: 1 }}>Forbes</Link>
          <br></br>
          <Link href="https://www.dtcc.com/annuals/2023/performance/" target="_blank" rel="noreferrer" variant="body2" sx={{ p: 1 }}>DTCC performance dashboard</Link>
          
          <Typography variant="body2" sx={{ p: 1 }}>Have fun :)</Typography>
        </Popover>
    </div>
        
      </div>

      





      <div className="container-main">
        <div className="textrow">
          <span className="label">Total LINK supply:</span>
          <span className="value">{totalSupply.toLocaleString()}</span>

        </div>
        <div className="textrow altrow">
          <span className="label">CCIP flat fee (FF):</span>
          <span className="value">$0.225</span>
        </div>
        <div className="textrow">
          <span className="label">CCIP value based fee (VBF):</span>
          <span className="value">0.063%</span>
        </div>
        <div className="textrow altrow">
          <span className="label swift">SWIFT annual volume:</span>
          <span className="value swift">${swiftAnnualVolume.toLocaleString()}</span>
        </div>
        <div className="textrow">
          <span className="label swift">SWIFT annual transactions:</span>
          <span className="value swift">{swiftAnnualTransactions.toLocaleString()}</span>
        </div>
        <div className="textrow altrow">
          <span className="label dtcc">DTCC annual volume:</span>
          <span className="value dtcc">${dtccAnnualVolume.toLocaleString()}</span>
        </div>
        <div className="textrow">
          <span className="label dtcc">DTCC annual transactions:</span>
          <span className="value dtcc">{dtccAnnualTransactions.toLocaleString()}</span>
        </div>
        
        <div className="altrowtall">
        <div className="row">
          <span className="label">LINK price:</span>
          <span className="slidervaluetest">${linkPrice.toLocaleString()}</span>
        </div>
        <div className="row">
          <div className="slidertest">
            <Box sx={{ width: sliderWidth, height: 26}}>
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <Slider aria-label="linkPrice" value={linkPrice} onChange={(event, newValue) => {setLinkPrice(newValue); updateFF(); updateVBF()}} min={1} max= {10000} size="small"/>
              </Stack>   
            </Box>
          </div>
        </div>
        </div>

        <div className="rowtall">
        <div className="row">
          <span className="label">Circulating supply:</span>
          <span className="slidervaluetest">{circulatingSupplyNum.toLocaleString()} LINK</span>
        </div>
        <div className="row">
          <div className="slidertest">
            <Box sx={{ width: sliderWidth, height: 26}}>
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
              <Slider aria-label="circulatingSupply" value={circulatingSupply} onChange={(event, newValue) => {setCirculatingSupply(newValue); updateFF(); updateVBF()}} min={58.71} max= {100} size="small"/>
              </Stack>   
            </Box>
          </div>
        </div>
        </div>

        <div className="altrowtall">
        <div className="row">
        <span className="label">Staking pool:</span>
          <span className="slidervaluetest">{stakedSupplyNum.toLocaleString()} LINK</span>
        </div>
        <div className="row">
          <div className="slidertest">
            <Box sx={{ width: sliderWidth, height: 26}}>
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
              <Slider aria-label="stakingPool" value={stakedSupply} onChange={(event, newValue) => {setStakedSupply(newValue);updateFF(); updateVBF()}} min={7.6647930505874} max= {100} size="small"/>
              </Stack>   
            </Box>
          </div>
        </div>
        </div>

        <div className="rowtall">
        <div className="row">
        <span className="label">Stakers' revenue share:</span>
          <span className="slidervaluetest">{stakerRevenue}%</span>
        </div>
        <div className="row">
          <div className="slidertest">
            <Box sx={{ width: sliderWidth, height: 26}}>
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
              <Slider aria-label="revenueShare" value={stakerRevenue} onChange={(event, newValue) => {setStakerRevenue(newValue); updateFF(); updateVBF()}} min={0} max= {100} size="small"/>
              </Stack>   
            </Box>
          </div>
        </div>
        </div>
 
        <div className="altrowtall">
        <div className="row">
        <span className="label">SWIFT & DTCC through CCIP:</span>
          <span className="slidervaluetest">{ccipFlow}%</span>
        </div>
        <div className="row">
          <div className="slidertest">
            <Box sx={{ width: sliderWidth, height: 26}}>
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
              <Slider aria-label="ccipFlow" value={ccipFlow} onChange={(event, newValue) => {setCcipFlow(newValue); updateFF(); updateVBF()}} min={0} max= {100} size="small"/>
              </Stack>   
            </Box>
          </div>
        </div>
        </div>

        <div className="rowtall">
        <div className="row">
        <span className="label">Amount staked:</span>
          <span className="slidervaluetest">{amountStaked.toLocaleString()} LINK</span>
        </div>
        <div className="row">
          <div className="slidertest">
            <Box sx={{ width: sliderWidth, height: 26}}>
              <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
              <Slider aria-label="linkPrice" value={amountStaked} onChange={(event, newValue) => {setAmountStaked(newValue); updateFF(); updateVBF()}} min={1} max= {15000} size="small"/>
              </Stack>   
            </Box>
          </div>
        </div>
        </div>


        <div className="textrow altrow">
          <span className="label">Annual revenue from {amountStaked.toLocaleString()} LINK staked (FF):</span>
          <span className="value">{totalFlatFeeRevenuInLink.toLocaleString()} LINK or ${totalFlatFeeRevenue.toLocaleString()} = {flatFeeRewardRate.toLocaleString()}% reward</span>
        </div>
        <div className="textrow">
          <span className="label">Annual revenue from {amountStaked.toLocaleString()} LINK staked (VBF):</span>
          <span className="value">{totalVariableFeeRevenueInLink.toLocaleString()} LINK or ${totalVariableFeeRevenue.toLocaleString()} = {variableFeeRewardRate.toLocaleString()}% reward</span>
        </div>

        <div className="textrow altrow">
          <span className="label">Total annual staking rewards - paid to all stakers (FF):</span>
          <span className="value">{ffAnnualResult}</span>
        </div>
        <div className="textrow">
          <span className="label">Total annual staking rewards - paid to all stakers (VBF):</span>
          <span className="value">{vbfAnnualResult}</span>
        </div>

      </div>


      

    </div>
  );
}

export default App;
