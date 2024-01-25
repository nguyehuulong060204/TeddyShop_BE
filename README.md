# TeddyShop Backend

Phần backend của TeddyShop là nơi xử lý logic và cung cấp API cho phần frontend của trang web. Nó sẽ xử lý các yêu cầu từ người dùng và tương tác với cơ sở dữ liệu để lấy và cập nhật thông tin sản phẩm, đơn hàng và tài khoản người dùng.

## Cấu trúc thư mụcapp

controllers # Thư mục chứa các tệp điều khiển (controllers)
models # Thư mục chứa các tệp mô hình (models)
routes # Thư mục chứa các tệp định tuyến (routes)
config
database.js # Cấu hình cơ sở dữ liệu
server.js # Cấu hình máy chủ

- **Thư mục `controllers`:** Chứa các tệp điều khiển (controllers) để xử lý yêu cầu từ phía frontend và truy cập vào dữ liệu. Ví dụ: `productController.js`, `orderController.js`, `userController.js`.

- **Thư mục `models`:** Chứa các tệp mô hình (models) đại diện cho các đối tượng trong cơ sở dữ liệu. Ví dụ: `Product.js`, `Order.js`, `User.js`.

- **Thư mục `routes`:** Chứa các tệp định tuyến (routes) để xác định các API endpoint và liên kết chúng với các tệp điều khiển tương ứng. Ví dụ: `productRoutes.js`, `orderRoutes.js`, `userRoutes.js`.

- **Tệp `database.js`:** Cấu hình kết nối với cơ sở dữ liệu MongoDB.

- **Tệp `server.js`:** Tệp chính để cấu hình và khởi chạy máy chủ.

## Công nghệ sử dụng

TeddyShop Backend sử dụng các công nghệ sau:

- **Node.js:** Sử dụng Node.js để triển khai phần backend của trang web.
- **Express.js:** Sử dụng Express.js làm framework để xây dựng API và xử lý các yêu cầu HTTP.
- **MongoDB:** Sử dụng MongoDB làm cơ sở dữ liệu để lưu trữ thông tin sản phẩm, đơn hàng và tài khoản người dùng.
- **Mongoose:** Sử dụng Mongoose làm thư viện ODM (Object Data Modeling) để tương tác với cơ sở dữ liệu MongoDB.
- **JWT:** Sử dụng JSON Web Tokens (JWT) để xác thực và quản lý phiên đăng nhập của người dùng.

## Các chức năng chính

Dưới đây là một số chức năng chính của TeddyShop Backend:

- **Quản lý sản phẩm:** Xử lý yêu cầu để lấy danh sách sản phẩm, tạo sản phẩm mới, cập nhật thông tin sản phẩm và xóa sản phẩm.

- **Quản lý đơn hàng:** Xử lý yêu cầu để lấy danh sách đơn hàng, tạo đơn hàng mới, cập nhật trạng thái đơn hàng và xóa đơn hàng.

- **Quản lý tài khoản người dùng:** Xử lý yêu cầu để đăng ký tài khoản mới, xác thực người dùng, quản lý thông tin cá nhân và xóa tài khoản.

- **Xác thực và phân quyền:** Cung cấp cơ chế xác thực và phân quyền để đảm bảo rằng chỉ những người dùng được ủy quyền mới có thể thực hiện các thao tác nhất định.

- **Xử lý lỗi và ghi nhới:** Xử lý lỗi và ghi nhật ký:\*\* Xử lý các lỗi xảy ra trong quá trình xử lý yêu cầu và ghi lại các sự kiện quan trọng vào nhật ký hệ thống.

## API Endpoints

Dưới đây là một số ví dụ về các API endpoints có thể được triển khai trong TeddyShop Backend:

- **GET /api/products:** Lấy danh sách sản phẩm.
- **GET /api/products/:id:** Lấy thông tin chi tiết về một sản phẩm cụ thể.
- **POST /api/products:** Tạo một sản phẩm mới.
- **PUT /api/products/:id:** Cập nhật thông tin của một sản phẩm cụ thể.
- **DELETE /api/products/:id:** Xóa một sản phẩm cụ thể.

- **GET /api/blogs:** Lấy danh sách bài viết.
- **GET /api/blog/:id:** Lấy thông tin chi tiết về một bài viếtcụ thể.
- **POST /api/blog:** Tạo một bài viết mới.
- **PUT /api/blog/:id:** Cập nhật thông tin của một bài viết cụ thể.
- **DELETE /api/blog/:id:** Xóa một bài viết cụ thể.

- **POST /api/register:** Đăng ký tài khoản mới.
- **POST /api/login:** Đăng nhập và nhận mã thông báo JWT.
- **GET /api/profile:** Lấy thông tin cá nhân của người dùng đang đăng nhập.

Đây chỉ là một số ví dụ và bạn có thể tùy chỉnh API endpoints theo yêu cầu của dự án của bạn.

## Cài đặt và Chạy

Để cài đặt và chạy TeddyShop Backend, bạn có thể thực hiện các bước sau:

1. Clone repository từ GitHub:

> `git clone <repository_url>`
2. Di chuyển vào thư mục backend:
> `cd TeddyShop/backend`
3. Cài đặt các dependencies:
> `yarn install`
4. Cấu hình kết nối cơ sở dữ liệu MongoDB trong tệp `database.js`.
5. Khởi chạy máy chủ:
> `npm start`

Sau khi máy chủ được khởi chạy thành công, bạn có thể gửi các yêu cầu API từ phía frontend của mình đến các endpoint tương ứng.
