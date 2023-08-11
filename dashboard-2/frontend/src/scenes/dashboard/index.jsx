import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import EmailIcon from "@mui/icons-material/Email";
import RecyclingIcon from '@mui/icons-material/Recycling';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import HardwareIcon from '@mui/icons-material/Hardware';
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import PieChart from "../../components/PieChart";
import {useEffect, useState, useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import io from 'socket.io-client';
// import makeStyles from "@material-ui/core";
import {Pagination} from "@mui/lab";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [Materials, setMaterials] = useState();
  const {user} = useContext(AuthContext);
  const[page, setPage] = useState(1);
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const numItems = Materials ? Object.keys(Materials[formattedDate]).length : 0;
  const itemsPerPage = 4;
  const numPages = Math.ceil(numItems / itemsPerPage);
 
    useEffect(() => {
        const fetchMaterials = async() => {
            const response = await fetch('/api/materials', {
              headers : {
                'authorization': `Bearer ${user.token}`
              },
            });
            const data = await response.json();
            if (response.ok) {
              if (!data[formattedDate]) {
                data[formattedDate] = {
                  'Category 2: Paper and Cardboard Waste': 10,
                  'Category 5: Other': 10,
                  'Category 1: Plastic Waste': 15,
                  'Category 3: Metal Waste': 0,
                  'Category 4: Soil and Stones': 0
                }
              }
              setMaterials(data);
            }
        }
        if (user) {
          fetchMaterials();
        }
    }, [user]);
    const IconObject = {
        "Soil": <RecyclingIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }}/>,
        "Discarded Clothing": <DoNotDisturbIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }}/>,
        "Rubber And Leather Products": <HardwareIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }}/>,
        "Wood Products": <RecyclingIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }}/>,
        "Food Waste": <DoNotDisturbIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }}/>,
        "Plastic Products": <HardwareIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }}/>,
        "Grass, Leaves And Bush Trimmings": <RecyclingIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }}/>,
        "Cardboard Products": <DoNotDisturbIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }}/>,
        "Glass Products": <HardwareIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }}/>,
        "Ferrous, Non-Ferrous And Aluminum Products": <RecyclingIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }}/>,
        "Not Classified": <DoNotDisturbIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }}/>,
    }
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
            {Materials && Object.keys(Materials[formattedDate]).slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage).map(category => {
              return (
                <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={category.split(":")[1]}
            subtitle={Materials[formattedDate][category]}
            progress="0.80"
            increase="+43%"
            // icon={
            //   IconObject[material?.name]
            // }
          />
        </Box>
              )
            })}
        <Box
          gridColumn="span 10"
          gridRow="span 1"
          // backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        <Pagination 
            sx={{
        padding: 10,
      width: "100%",
    display: "flex",
    height: "100%",
    marginTop: "-20px",
    marginLeft: "100px",
    justifyContent: "center",
    "& .MuiPaginationItem-root": {
      color: colors.greenAccent[500],
    },
  }}
            count={numPages}
            onChange={(_, value) => {
            setPage(value);
            // window.scroll(0, 450);
          }}
        />
        </Box>
    
        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Increase in Waste Collected
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                10%
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            {Materials && <LineChart isDashboard={true} Data = {Materials}/>}
          </Box>
        </Box>
        

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Waste Distribution
          </Typography>
          <Box
            overflow="hidden"
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="0px"
          >
            <Box width={500} height={250}>
             {Materials && <PieChart data = {Materials}/>} 
            </Box>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Waste Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            // alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Waste Collected
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
             
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
