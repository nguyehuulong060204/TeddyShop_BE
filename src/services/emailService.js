import { transporter } from '~/config/nodemailer'

const sendEmail = async (data) => {
  return await transporter.sendMail({
    from: '"Teddyshop Việt Nam" <kaisa13102004@gmail.com>',
    to: data.receiverEmail,
    subject: 'Đăng kí tài khoản thành công',
    html: `<h2 class="code-line" data-line-start="1" data-line-end="2"><a id="Ti_khon_ca_bn__c_to_thnh_cng_1"></a>Tài khoản của bạn đã được tạo thành công!</h2>
    <p class="has-line-data" data-line-start="3" data-line-end="4">Chúc mừng! Tài khoản của bạn đã được tạo thành công. Bạn đã trở thành thành viên của chúng tôi và có thể truy cập vào các tính năng và dịch vụ mà chúng tôi cung cấp.</p>
    <p class="has-line-data" data-line-start="5" data-line-end="6">Dưới đây là một số thông tin quan trọng về tài khoản của bạn:</p>
    <ul>
        <li class="has-line-data" data-line-start="7" data-line-end="8"><strong>Tên người dùng:</strong> ${data.userName} </li>
        <li class="has-line-data" data-line-start="8" data-line-end="10"><strong>Địa chỉ email:</strong> ${data.receiverEmail}</li>
    </ul>
    <p class="has-line-data" data-line-start="10" data-line-end="11">
        Nếu bạn gặp bất kỳ vấn đề hoặc câu hỏi nào, xin vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi qua địa chỉ email <strong><a href="mailto:huynq13102004@gmail.com">huynq13102004@gmail.com</a></strong> hoặc qua số điện thoại
        <strong>0352223905</strong>. Chúng tôi sẵn lòng giúp bạn với mọi thắc mắc.
    </p>
    </br>
    <p class="has-line-data" data-line-start="12" data-line-end="13">
      Cảm ơn bạn đã tham gia cùng chúng tôi! Chúng tôi hy vọng bạn sẽ có trải nghiệm tuyệt vời với dịch vụ của chúng tôi.
    </p>
    <p class="has-line-data" data-line-start="14" data-line-end="16">
        Trân trọng,<br />
        <strong>TeddyShop.</strong>
    </p>`
  })
}

const verifyEmail = async (data) => {
  // Gửi email với mã xác minh
  return await transporter.sendMail({
    from: '"Teddyshop Việt Nam" <kaisa13102004@gmail.com>',
    to: data.receiverEmail,
    subject: 'Xác thực địa chỉ email',
    html: `<h1 id="x-c-th-c-a-ch-email-c-a-b-n-t-i-teddyshop">Xác thực địa chỉ email của bạn tại TeddyShop</h1>
    <p>Chào mừng bạn đến với TeddyShop, ${data.userName}!</p>
    <p>Cảm ơn bạn đã đăng ký tài khoản tại TeddyShop. Để hoàn tất quá trình đăng ký và bắt đầu trải nghiệm mua sắm tuyệt vời cùng chúng tôi, bạn cần xác thực địa chỉ email của mình.</p>
    <h2 id="vui-l-ng-nh-p-m-x-c-minh-sau-">Vui lòng nhập mã xác minh sau:</h2>
    <p><strong>${data.verificationCode}</strong></p>
    <p>Mã xác minh này có hiệu lực trong vòng 24 giờ.</p>
    <h2 id="t-i-sao-c-n-x-c-th-c-email-">Tại sao cần xác thực email?</h2>
    <p>Xác thực email giúp đảm bảo rằng bạn là chủ sở hữu của tài khoản và bảo vệ tài khoản của bạn khỏi truy cập trái phép. Việc xác thực email cũng giúp chúng tôi có thể liên lạc với bạn khi cần thiết, chẳng hạn như khi bạn quên mật khẩu hoặc cần hỗ trợ từ bộ phận chăm sóc khách hàng.</p>
    <h2 id="c-ch-x-c-th-c-email-">Cách xác thực email:</h2>
    <ol>
    <li>Sao chép mã xác minh <strong>${data.verificationCode}</strong>.</li>
    <li>Quay lại trang web TeddyShop và truy cập trang xác thực email.</li>
    <li>Dán mã xác minh vào trường được yêu cầu.</li>
    <li>Nhấp vào nút &quot;Xác minh&quot;.</li>
    </ol>
    <h2 id="n-u-b-n-g-p-s-c-khi-x-c-th-c-email-">Nếu bạn gặp sự cố khi xác thực email:</h2>
    <ul>
    <li>Vui lòng đảm bảo rằng bạn đã nhập đúng mã xác minh.</li>
    <li>Kiểm tra lại xem mã xác minh đã hết hạn hay chưa.</li>
    <li>Nếu bạn đã thử các cách trên mà vẫn không thể xác thực email, vui lòng liên hệ với bộ phận chăm sóc khách hàng của TeddyShop để được hỗ trợ.</li>
    </ul>
    <h2 id="tr-n-tr-ng-">Trân trọng,</h2>
    <p>Đội ngũ TeddyShop</p>
    <h2 id="li-n-h-">Liên hệ:</h2>
    <ul>
    <li>Website: <a href="https://toteddyshop.com/">https://teddyShop.com/</a></li>
    <li>Email: huynq13102004@gmail.com</li>
    <li>Hotline: 0352223905</li>
    </ul>    
    `
  })
}

const forgotPassword = async (data) => {
  return await transporter.sendMail({
    from: '"Teddyshop Việt Nam" <kaisa13102004@gmail.com>',
    to: data.receiverEmail,
    subject: 'Xác thực địa chỉ email',
    html: `<h2 id="kh-i-ph-c-m-t-kh-u-c-a-b-n">Khôi phục mật khẩu của bạn</h2>
    <p>Xin chào ${data.userName},</p>
    <p>Chúng tôi đã nhận được yêu cầu khôi phục mật khẩu cho tài khoản của bạn. Để tiếp tục quá trình khôi phục mật khẩu, hãy nhấp vào liên kết dưới đây:</p>
    <p><a href=${data.linkForgotPass}>[Đặt lại mật khẩu]</a></p>
    <p>Nếu bạn không yêu cầu khôi phục mật khẩu hoặc không nhớ đã thực hiện hành động này, xin vui lòng bỏ qua email này.</p>
    <p>
      Trân trọng, <br />
      <strong>TeddyShop.</strong>
    </p>
    `
  })
}

export { sendEmail, verifyEmail, forgotPassword }
