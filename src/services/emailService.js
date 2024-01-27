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
  return await transporter.sendMail({
    from: '"Teddyshop Việt Nam" <kaisa13102004@gmail.com>',
    to: data.receiverEmail,
    subject: 'Xác thực địa chỉ email',
    html: `<h2 id="x-c-th-c-a-ch-email-c-a-b-n">Xác thực địa chỉ email của bạn</h2>
    <p>${data.userName},</p>
    <p>Chúng tôi hân hạnh thông báo rằng bạn đã tạo thành công tài khoản tại Teddyshop. 
    Để hoàn tất quá trình đăng ký, bạn cần xác thực địa chỉ email của mình bằng cách nhấp vào liên kết dưới đây:</p>
    <p><a href=${data.linkVerifyEmail}>Xác thực email</a></p>
    <p>Nếu bạn không thực hiện đăng ký tài khoản này hoặc không nhớ đã thực hiện hành động này, xin vui lòng bỏ qua email này.</p>
    <p>Trân trọng, <br /> 
    <strong>TeddyShop.</strong></p>
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
