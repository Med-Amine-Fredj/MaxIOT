const metaData = [
  {
    device_id: '1',
    name: 'sensor',
    type: 'kpi',
    contiuous: true,
    meta: {
      labels: ['Test1', 'Test2', 'Test3', 'Test1', 'Test2', 'Test3'],
      legend: ['L1', 'L2', 'L3'],
      colors: ['#6E53A2', '#AC94DB', '#E7E0F5'],
    },
  },
  {
    device_id: '2',
    name: 'sensor2',
    type: 'barchar',
    meta: {
      labels: ['Test1', 'Test2', 'Test3', 'Test1', 'Test2', 'Test3'],
      legend: ['L1', 'L2', 'L3'],
      colors: ['#6E53A2', '#AC94DB', '#E7E0F5'],
    },
  },
  {
    device_id: '3',
    name: 'sensor3',
    type: 'gauge',
    meta: {
      labels: ['Test1', 'Test2', 'Test3', 'Test1', 'Test2', 'Test3'],
      legend: ['L1', 'L2', 'L3'],
      colors: ['#6E53A2', '#AC94DB', '#E7E0F5'],
    },
  },
  {
    device_id: '4',
    name: 'sensor4',
    type: 'kpi',
    meta: {
      labels: ['Test1', 'Test2', 'Test3', 'Test1', 'Test2', 'Test3'],
      legend: ['L1', 'L2', 'L3'],
      colors: ['#6E53A2', '#AC94DB', '#E7E0F5'],
    },
  },
  {
    device_id: '5',
    name: 'sensor5',
    type: 'gauge',
    meta: {
      labels: ['Test1', 'Test2', 'Test3', 'Test1', 'Test2', 'Test3'],
      legend: ['L1', 'L2', 'L3'],
      colors: ['#6E53A2', '#AC94DB', '#E7E0F5'],
    },
  },
  {},
];
const UIstyling = {
  kpi: { scrollable: true },
  barchar: { scrollable: false },
  gauge: { scrollable: false },
};
const data = [{ deviceId: 4, data: [] }];
