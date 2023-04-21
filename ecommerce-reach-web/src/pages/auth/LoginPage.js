import React, { useState } from "react";
import './LoginPage.css'

import { Button, message, Checkbox, Form, Input, Typography, Space, Alert } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { request } from "../../util/api";

export default function LoginPage() {
    const { Title } = Typography;

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = () => {
        var params = {
            "username": username,
            "password": password
        }
        setLoading(true)
        request("post", "user/login", params).then(res => {
            setTimeout(() => {
                setLoading(false)
            }, 1000)
            // console.log(res)
            if (res.data && res.data.is_login) {
                // message.success("Login Sucessful!")

                //save local storage to get data for show data to user or ui
                localStorage.setItem("is_login", "1") //is_login = 1
                localStorage.setItem("profile", JSON.stringify(res.data.profile)) //save data for profile
                window.location.href = "/"
            } else {
                message.warning(res.data.message)
            }
        })
        // alert(99)
    }
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>

            {/* <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center', marginTop: '30px' }}><Title>Login Form</Title></Space> */}

            {/* <input placeholder="username"
                onChange={(event) => {
                    setUsername(event.target.value)
                }}
            />
            <input placeholder="password"
                onChange={(event) => {
                    setPassword(event.target.value)
                }}
            />

            <Button onClick={handleLogin}>Login</Button> */}
            {/* <Space style={{ width: '100%', justifyContent: 'center', marginTop: '30px' }}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        onChange={(event) => {
                            setUsername(event.target.value)
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button onClick={handleLogin}>Login</Button>
                    </Form.Item>
                </Form>
            </Space> */}
            <div className='loging-form'>
                <Title>Login Form</Title>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        onChange={(event) => {
                            setUsername(event.target.value)
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            onClick={handleLogin}
                            loading={loading}

                        >
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}