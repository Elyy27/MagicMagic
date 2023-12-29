<h1 align="center">------------- MAGIC MAGIC -------------</h1>

<h1 align="center">Mục lục 📖</h1>

<h2 align="center">
  <a href="#introduction">I. Giới thiệu chung</a>
  <br />
  <a href="#about">II. Mô tả</a>
  <br />
  <a href="#function">III. Chức năng</a>
  <br />
  <a href="#technique">IV. Công nghệ</a>
  <br />
  <a href="#setting">V. Cách cài đặt và chạy</a>
  <br />
  <a href="#demo">VI. Video demo</a>
  <br />
</h2>
<br />

## I. Giới thiệu chung <a name="introduction"></a>
1. Nhóm: 36
2. Lớp: INT3306 2 - Phát triển ứng dụng Web
3. Tên web: MagicMagic
4. Thành viên:

| Order |        Name          |    ID    |        Email        |                 Github account                  |
| :---: |:--------------------:|:--------:|:-------------------:|:-----------------------------------------------:|
|   1   |  Nguyễn Phương Linh  | 21020545 | 21020545@vnu.edu.vn |       [Elyy27](https://github.com/Elyy27)       |
|   2   |    Trần Diệu Anh     | 21020279 | 21020279@vnu.edu.vn |  [AnhDieuTran](https://github.com/AnhDieuTran)  |
|   3   | Nguyễn Thị Ngọc Minh | 21020358 | 21020358@vnu.edu.vn | [ngocminh1605](https://github.com/ngocminh1605) |


## II. Mô tả <a name="about"></a>
MagicMagic là công ty hoạt động trong lĩnh vực chuyển phát. Công ty này có các điểm giao dịch phủ khắp cả nước. Mỗi điểm giao dịch phụ trách một vùng. Ngoài các điểm giao dịch, công ty cũng có nhiều điểm tập kết hàng hóa. Mỗi điểm giao dịch sẽ làm việc với một điểm tập kết và ngược lại.

Người gửi, có hàng cần gửi, đem hàng đến một điểm giao dịch (thường là gần nhất) để gửi. Hàng, sau đó, được đưa đến điểm tập kết ứng với điểm giao dịch của người gửi, rồi được chuyển đến điểm 
tập kết ứng với điểm giao dịch của người nhận. Tại điểm giao dịch của người nhận, nhân viên giao hàng sẽ chuyển hàng đến tận tay người nhận.

## III. Chức năng <a name="function"></a>
### 1. Lãnh đạo
- Quản lý hệ thống các điểm giao dịch và điểm tập kết với các thao tác thêm, sửa, xóa.
- Quản lý tài khoản trưởng điểm điểm tập kết và điểm giao dịch với các thao tác thêm, sửa, xóa. 
- Thống kê hàng gửi, hàng nhận trên toàn quốc, từng điểm giao dịch hoặc điểm tập kết. Thống kế dạng đường giúp so sánh số lượng đơn các tháng

### 2. Trưởng điểm giao dịch
- Quản lý tài khoản giao dịch viên tại điểm giao dịch vs thao tác thêm sửa xóa nhân viên.
- Thống kê hàng gửi, hàng nhận,số lượng nhân viên tại điểm giao dịch.

### 3. Trưởng điểm tập kết
- Quản lý tài khoản nhân viên tại điểm tập kết với các thao tác thêm, sửa, xóa.
- Thống kê hàng gửi, nhận, số lượng nhân viên tại điểm tập kết.

### 4. Nhân viên giao dịch
- Ghi nhận hàng cần gửi của khách (người gửi), in giấy biên nhận chuyển phát và phát cho khách hàng.
- Tạo đơn chuyển hàng gửi đến điểm tập kết mỗi/trước khi đem hàng gửi đến điểm tập kết.
- Xác nhận đơn hàng về từ điểm tập kết.
- Tạo đơn hàng cần chuyển đến tay người nhận.
- Xác nhận hàng đã chuyển đến tay người nhận thành công .
- Xác nhận hàng không chuyển được đến người nhận và trả lại điểm giao dịch và hoàn trả lại người gửi.
- Thống kê tổng đơn hàng, đơn gửi, đơn nhận, đơn hàng đã chuyển thành công, đơn hàng chuyển không thành công và trả lại điểm giao dịch.

### 5. Nhân viên tập kết
- Xác nhận đơn hàng từ điểm giao dịch.
- Tạo đơn chuyển hàng đến điểm tập kết đích (ứng với điểm giao dịch đích, tức điểm giao dịch phụ trách vùng ứng với địa chỉ của người nhận).
- Xác nhận đơn hàng nhận về từ điểm tập kết khác.
- Tạo đơn chuyển hàng đến điểm giao dịch đích.

### 6. Khách hàng
- Tra cứu thông tin, trạng thái và tiến trình chuyển phát của kiện hàng mình gửi.

## IV. Công nghệ <a name="technique"></a>
- Ngôn ngữ: ReactJS <img alt="React" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" style="margin-left:20px;"/>
- Cơ sở dữ liệu: MySQL <img alt="SQL" width="26px" src="https://img.icons8.com/external-wanicon-flat-wanicon/48/external-sql-server-big-data-wanicon-flat-wanicon.png" style="margin-left:20px;" />

## V. Cách cài đặt và chạy <a name="setting"></a>

### 1. Cài đặt
#### a. Clone Repository
```bash
git clone https://github.com/ngocminh1605/MagicMagic.git
```

#### b. Cài đặt các gói npm cần thiết
```bash
npm install
```

#### c. Chạy frontend
```bash
npm start
```

#### d. Chạy backend
```bash
cd app
node app.js
```

### 2. Trưởng điểm giao dịch
- Quản lý tài khoản giao dịch viên tại điểm giao dịch vs thao tác thêm sửa xóa nhân viên.
- Thống kê hàng gửi, hàng nhận,số lượng nhân viên tại điểm giao dịch.

### 3. Trưởng điểm tập kết
- Quản lý tài khoản nhân viên tại điểm tập kết với các thao tác thêm, sửa, xóa.
- Thống kê hàng gửi, nhận, số lượng nhân viên tại điểm tập kết.


## VI. Video Demo <a name="demo"></a>
link
