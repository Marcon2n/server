# dashboard-socket


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
