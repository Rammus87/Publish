import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (value) => {
        console.log(value)
        await dispatch(fetchLogin(value))
        navigate('/')
        message.success("登入成功")
        //這個後端驗證的驗證碼必須使用驗證碼 ：246810
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
                    pattern:/^13\d{9}$/,
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