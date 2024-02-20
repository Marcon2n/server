const express = require("express");
const app = express();
const socketio = require("socket.io");
const expressServer = app.listen(9000);
const io = socketio(expressServer, {
  cors: { origin: "*" },
});

//set dashboard variable
let dashboardData = [
  {
    name: "Admin Dashboard Layout",
    layout: [
      {
        x: 0,
        y: 0,
        cols: 1,
        rows: 2,
        widget: {
          name: "admin",
          data: {
            name: "error task",
            value: null,
            color: "text-warn",
            id: "b06e849a717",
            type: "number",
            height: 200,
          },
        },
        maxItemArea: 2,
      },
      {
        x: 1,
        y: 0,
        cols: 2,
        rows: 1,
        widget: {
          name: "admin",
          data: {
            name: "shcedule task",
            value: null,
            color: "text-primary",
            id: "06e849a717c",
            type: "number",
            height: 200,
          },
        },
        maxItemArea: 2,
      },
      {
        x: 1,
        y: 1,
        cols: 2,
        rows: 1,
        widget: {
          name: "admin",
          data: {
            label: "CPU",
            series: null,
            normal: null,
            medium: null,
            high: null,
            style: "false",
            id: "6e849a717c0",
            name: "admin",
            type: "radial",
            chartType: 0,
            height: 200,
          },
        },
        maxItemCols: 2,
        maxItemRows: 2,
      },
      {
        x: 3,
        y: 0,
        cols: 2,
        rows: 2,
        widget: {
          name: "admin",
          data: {
            label: "RAM",
            series: null,
            normal: null,
            medium: null,
            high: null,
            style: "true",
            id: "849a717c015",
            type: "radial",
            chartType: 1,
            height: 400,
          },
        },
        maxItemCols: 2,
        maxItemRows: 2,
      },
      {
        x: 5,
        y: 0,
        cols: 2,
        rows: 2,
        widget: {
          data: {
            name: "admin",
            itemArray: [
              {
                name: null,
                value: null,
                color: null,
              },
              {
                name: null,
                value: null,
                color: null,
              },
            ],
            id: "49a717c0157",
            type: "radial",
            chartType: 2,
            height: 400,
          },
        },
        maxItemCols: 2,
        maxItemRows: 2,
      },
      {
        x: 6,
        y: 2,
        cols: 3,
        rows: 2,
        widget: {
          name: "admin",
          data: {
            itemArray: [
              {
                name: null,
                value: null,
                color: null,
              },
              {
                name: null,
                value: null,
                color: null,
              },
            ],
            id: "9a717c01576",
            type: "funnel",
            height: 400,
          },
        },
        maxItemRows: 2,
      },
      {
        x: 0,
        y: 2,
        cols: 6,
        rows: 2,
        widget: {
          name: "admin",
          data: {
            rows: null,
            cols: null,
            rowsValue: "4",
            toolBar: null,
            itemArray: [
              {
                name: null,
                value: null,
                color: null,
              },
              {
                name: null,
                value: null,
                color: null,
              },
            ],
            id: "a717c015765",
            type: "line",
            height: 400,
          },
        },
        maxItemRows: 2,
      },
      {
        x: 4,
        y: 4,
        cols: 5,
        rows: 2,
        widget: {
          name: "admin",
          data: {
            rows: null,
            cols: null,
            rowsValue: '["sale","revenue"]',
            toolBar: null,
            itemArray: [
              {
                name: null,
                value: null,
                color: null,
              },
              {
                name: null,
                value: null,
                color: null,
              },
            ],
            id: "717c0157654",
            type: "column",
            chartType: 0,
            height: 400,
          },
        },
        maxItemRows: 2,
      },
      {
        x: 0,
        y: 6,
        cols: 7,
        rows: 2,
        widget: {
          name: "admin",
          data: {
            rows: null,
            cols: null,
            rowsValue: '["sale","revenue"]',
            toolBar: null,
            itemArray: [
              {
                name: null,
                value: null,
                color: null,
              },
              {
                name: null,
                value: null,
                color: null,
              },
            ],
            id: "17c01576547",
            type: "column",
            chartType: 1,
            height: 400,
          },
        },
        maxItemRows: 2,
      },
      {
        x: 0,
        y: 4,
        cols: 4,
        rows: 2,
        widget: {
          name: "admin",
          data: {
            rows: null,
            cols: null,
            rowsValue: '["sale","revenue"]',
            toolBar: null,
            itemArray: [
              {
                name: null,
                value: null,
                color: null,
              },
              {
                name: null,
                value: null,
                color: null,
              },
            ],
            id: "7c015765478",
            type: "column",
            chartType: 2,
            height: 400,
          },
        },
        maxItemRows: 2,
      },
      {
        x: 7,
        y: 0,
        cols: 2,
        rows: 2,
        widget: {
          name: "admin",
          data: {
            itemArray: [
              {
                name: null,
                value: null,
                color: null,
              },
              {
                name: null,
                value: null,
                color: null,
              },
            ],
            id: "c0157654784",
            type: "pie",
            chartType: 0,
            height: 400,
          },
        },
        maxItemCols: 2,
        maxItemRows: 2,
      },
      {
        x: 7,
        y: 6,
        cols: 2,
        rows: 2,
        widget: {
          name: "admin",
          data: {
            itemArray: [
              {
                name: null,
                value: null,
                color: null,
              },
              {
                name: null,
                value: null,
                color: null,
              },
            ],
            id: "0157654784c",
            type: "pie",
            chartType: 1,
            height: 400,
          },
        },
        maxItemCols: 2,
        maxItemRows: 2,
      },
    ],
  },
  {
    name: "Sale Dashboard Layout",
    layout: [],
  },
  {
    name: "Collection Dashboard Layout",
    layout: [],
  },
];

//set data follow chart series change update base on data server
const changeData = [
  {
    id: "b06e849a717",
    series: [],
  },
  {
    id: "06e849a717c",
    series: [],
  },
  {
    id: "9a717c01576",
    series: [],
  },
  {
    id: "a717c015765a",
    series: [],
  },
  {
    id: "a717c015765",
    series: [],
  },
  {
    id: "a717c015765a",
    series: [],
  },
  {
    id: "eb6ff1e74c4",
    series: [],
  },
  {
    id: "6ff1e74c491",
    series: [],
  },
  {
    id: "ff1e74c4917",
    series: [],
  },
  {
    id: "74c49174449",
    series: [],
  },
];
let randomArr = [];
let realtimeSeries = [];

//MODEL OF DATA CHART
//SERIES TYPE OF NUMBER, RADIAL, PIE {id: string, series: Array<number>}
//EXAMPLE: with chart have 1 value {id: 'chartID', series: [10]}
//EXAMPLE: with chart have 2 more {id: 'chartID', series: [10,20]} (Pie, Radial Multi)
//SERIES TYPE OF LINE, COLUMN, FUNNEL {id: string, series: Array<chart>}
//CHART TYPE {name: string, data: Array<number>}
//WITH COLUMN AND LINE with realtime need series data [epoch time, value]
//EXAMPLE FUNNEL {id: 'chartID', series: [{name: "Funnel Series", data: [12,13]}]} number of data base on funnel item data
//EXAMPLE LINE, COLUMN with fix categories xaxis {id: 'chartID', series: [{name: 'name line chart 1', data: [10,20,...]},...,{name: 'name line chart n', data: [10,20,...]}]} length of series base on length of how many column or line need to draw, length of data of each column or line base on length of fix categories
//EXAMPLE LINE, COLUMN not fix categories(categories run by time change) {id: 'chartID', series: [{name: 'name line chart 1', data: [[Epoch Time1,value1],[Epoch Time2,value2]]},...,{name: 'name line chart n', data: [[Epoch Time1,value1],[Epoch Time2,value2]]}] length of series base on length of how many column or line need to draw, length of data of each column or line base on length of how many time need to show
//Want to show 4 time each time separate evenly 5 minutes input in data [[1689935039,20],[1689935039+300000,30],[1689935039+600000,40],[1689935039+900000,20]] want to increase time just need to splice first array then push new array to bottom

//CẤU TRÚC DỮ LIỆU API CỦA DASHBOARD:
// [{name: string,layout: Array<DashboardType>}]
// DashboardType = {x: number, y: number, cols: number, rows: number, widget: WidgetType}
// WidgetType = {name: string, data: Object, id: string,...}

//CẤU TRÚC DỮ LIỆU CỦA DATA TRUYỀN CHO BIỂU ĐỒ:
//Với các kiểu widget là NUMBER, RADIAL, PIE cấu trúc sẽ giống nhau {id: string, series: Array<number>}
//VÍ DỤ: Với các biểu đồ có 1 giá trị {id: 'chartID', series: [10]}, các biểu đồ có nhiều hơn 1 giá trị {id: 'chartID', series: [10,20]} (thường áp dụng cho biểu đồ RADIAL MULTI và PIE)
//Với các kiểu widget là LINE, COLUMN, FUNNEL {id: string, series: Array<chart>}
//Chart TYPE {name: string, data: Array<number>}
//Tuy nhiên với biểu đồ LINE và COLUMN chạy theo thời gian thực sẽ có thay đổi giá trị của number sẽ phải thay bằng giá trị ARRAY có cấu trúc [epoch time, giá trị hiển thị]
//VÍ DỤ: với biểu đồ FUNNEL {id: 'id tương ứng', series: [{name: 'Funnel Series', data: [10,20,...]}]} số lượng của data tương ứng với số lượng giá trị số lượng cần biểu diễn
//Với biểu đồ LINE và COLUMN khi cố định giá trị trục hoành (x):
//{id: 'chartID', series: [{name: 'name line chart 1', data: [10,20,...]},...,{name: 'name line chart n', data: [10,20,...]}]}
//số lượng item trong series tương ứng với số lượng LINE hoặc COLUMN muốn biểu diễn trên đồ thị, số lượng data tương ứng với số lượng giá trị cố định của trục hoành (x)
//Với biểu đồ LINE và COLUMN khi chạy theo thời gian thực:
//{id: 'chartID', series: [{name: 'name line chart 1', data: [[Epoch Time1,value1],[Epoch Time2,value2]]},...,{name: 'name line chart n', data: [[Epoch Time1,value1],[Epoch Time2,value2]]}]
//số lượng item trong series tướng ứng với số lượng LINE hoặc COLUMN muốn biểu diễn trên đồ thị, số lượng data tương ứng với số lượng thời gian cần thể hiện
//VÍ DỤ: muốn thể hiện 4 mốc thời gian mỗi mốc cách nhau 5 phút, kiểu data biểu diễn [[1689935039,20],[1689935039+300000,30],[1689935039+600000,40],[1689935039+900000,20]]
// nếu muốn thay đổi giá trị mà vẫn giữ nguyên 4 mốc thời gian thì thực hiện xóa phần tử đầu tiên và thêm phần tử mới tương ứng vào cuối

function getRangeRandom(value) {
  return Math.floor(Math.random() * (value.max - value.min + 1)) + value.min;
}

function getDataSeries(data, countNumberSeries) {
  for (let i = 0; i < data.length; i++) {
    data[i].splice(0, 1);
    data[i].push([
      data[i][countNumberSeries - 2][0] + 300000,
      getRangeRandom({ min: 20, max: 400 }),
    ]);
    realtimeSeries[i] = {
      name: "realtimeLine" + i,
      data: data[i],
    };
  }
}

//make data attribute of series base on length of input line
function makeArrayData(countNumberLine, countNumberSeries) {
  let arrayData = [];
  let now = new Date().getTime();
  for (let i = 0; i < countNumberLine; i++) {
    let itemArrayData = [];
    for (let i = 0; i < countNumberSeries; i++) {
      itemArrayData.unshift([
        now + i * 300000,
        getRangeRandom({ min: 30, max: 300 }),
      ]);
    }
    arrayData.push(itemArrayData);
  }
  return arrayData;
}

randomArr = makeArrayData(2, 4);
console.log(randomArr);
getDataSeries(randomArr, 4);
console.log(realtimeSeries);
console.log(realtimeSeries[0].data);

io.on("connection", (socket) => {
  //check socket connection success or not
  console.log(socket.id, "has connected");

  //send dashboard data to client
  socket.emit("dataFromServer", { data: dashboardData });

  //sent data to change chart series

  const myInterval = setInterval(() => {
    changeData[0].series = [getRangeRandom({ min: 30, max: 100 })];
    changeData[1].series = [getRangeRandom({ min: 50, max: 100 })];
    changeData[2].series = [
      {
        name: "Funnel",
        data: [
          getRangeRandom({ min: 30, max: 150 }),
          getRangeRandom({ min: 50, max: 200 }),
        ],
      },
    ];
    changeData[3].series = [
      getRangeRandom({ min: 30, max: 100 }),
      getRangeRandom({ min: 50, max: 100 }),
    ];
    changeData[5].series = [getRangeRandom({ min: 30, max: 100 })];
    getDataSeries(randomArr, 4);
    changeData[4].series = realtimeSeries;
    changeData[6].series = [getRangeRandom({ min: 30, max: 100 })];
    changeData[7].series = [
      getRangeRandom({ min: 50, max: 100 }),
      getRangeRandom({ min: 50, max: 100 }),
    ];
    changeData[8].series = [
      getRangeRandom({ min: 50, max: 100 }),
      getRangeRandom({ min: 50, max: 100 }),
    ];
    changeData[9].series = [
      {
        name: "column 1",
        data: [
          getRangeRandom({ min: 30, max: 150 }),
          getRangeRandom({ min: 50, max: 200 }),
        ],
      },
      {
        name: "column 2",
        data: [
          getRangeRandom({ min: 30, max: 150 }),
          getRangeRandom({ min: 50, max: 200 }),
        ],
      },
    ];
    console.log(changeData);
    socket.emit("updateSeriesChart", { data: changeData });
  }, 10000);

  socket.on("manual-disconnection", (data) => {
    socket.disconnect();
  });

  // send message when client disconnect
  socket.on("disconnect", () => {
    console.log(socket.id + " is disconnected!");
    clearInterval(myInterval);
  });
});
