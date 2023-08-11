import { tokens } from "../theme";


export const mockTransactions = [
  {
    txId: "01e4dsa",
    user: "Plastic Product",
    date: "2023-07-09",
    cost: "43.95",
  },
  {
    txId: "0315dsaa",
    user: "Metal",
    date: "2023-07-09",
    cost: "133.45",
  },
  {
    txId: "01e4dsa",
    user: "Wet Waste",
    date: "2023-07-09",
    cost: "43.95",
  },
  {
    txId: "51034szv",
    user: "Plastic Product",
    date: "2023-07-09",
    cost: "200.95",
  },
  {
    txId: "0a123sb",
    user: "Wet Waste",
    date: "2023-07-09",
    cost: "13.55",
  },
  {
    txId: "01e4dsa",
    user: "aberdohnny",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "120s51a",
    user: "wootzifer",
    date: "2019-04-15",
    cost: "24.20",
  },
  {
    txId: "0315dsaa",
    user: "jackdower",
    date: "2022-04-01",
    cost: "133.45",
  },
];

export const mockBarData = [
  {
    "Date": "2023-07-08",
    "Plastic": 500,
    "hot dogColor": "hsl(229, 70%, 50%)",
    Metals: 300,
    burgerColor: "hsl(296, 70%, 50%)",
    "Wet Waste": 200,
    kebabColor: "hsl(97, 70%, 50%)",
    Others: 200,
    donutColor: "hsl(340, 70%, 50%)",
  },
  {
    "Date": "2023-07-09",
    "Plastic": 750,
    "hot dogColor": "hsl(229, 70%, 50%)",
    Metals: 500,
    burgerColor: "hsl(296, 70%, 50%)",
    "Wet Waste": 400,
    kebabColor: "hsl(97, 70%, 50%)",
    Others: 250,
    donutColor: "hsl(340, 70%, 50%)",
  },
];

export const mockPieData = [
  {
    id: "Plastic",
    label: "Plastic",
    value: 750,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "Metals",
    label: "Metals",
    value: 500,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "Wet Waste",
    label: "Wet Waste",
    value: 800,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "Others",
    label: "Others",
    value: 200,
    color: "hsl(229, 70%, 50%)",
  },
];

export const mockLineData = [
  {
    id: "Plastics",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "2023-07-08",
        y: 500,
      },
      {
        x: "2023-07-09",
        y: 750,
      },
    ],
  },
  {
    id: "Metals",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "2023-07-08",
        y: 200,
      },
      {
        x: "2023-07-09",
        y: 500,
      },
    ],
  },
  {
    id: "Wet Waste",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "2023-07-08",
        y: 300,
      },
      {
        x: "2023-07-09",
        y: 800,
      },
    ],
  },
  {
    id: "Others",
    color: tokens("dark").redAccent[400],
    data: [
      {
        x: "2023-07-08",
        y: 200,
      },
      {
        x: "2023-07-09",
        y: 250,
      },
    ],
  },
];