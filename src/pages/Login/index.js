import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'


const Login = () => {
    const onFinish = (value) => {
        console.log(value)
    }

    return (
      <div className="login">
        <Card className="login-container">
          <img className="login-logo" alt="logo" src={logo} />
          {/* 登入表單 */}
          <Form validateTrigger="onBlur" onFinish={onFinish}>
            <Form.Item 
              name="mobile"
              rules={[
                {
                    required: true,
                    message: '請輸入手機號'
                },
                {
                    pattern:/^09\d{8}$/,
                    message: '請輸入正確手機號'
                }
              ]}
            >
              <Input size="large" placeholder="請輸入手機號" />
            </Form.Item>
            <Form.Item
                name="code"
                rules={[
                 {
                  required: true,
                  message: '請輸入驗證碼!'
                }
              ]}
            >
              <Input size="large" placeholder="請輸入驗證碼" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                登入
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  
  export default Login