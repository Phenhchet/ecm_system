import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    UploadOutlined,
    UserOutlined,
    UsergroupAddOutlined,
    AppstoreFilled,
    FundFilled,
    DownOutlined,
    LogoutOutlined,


} from '@ant-design/icons';
import { Layout, Menu, theme, Button, Dropdown } from 'antd';
import "./MainLayout.css";
import { useNavigate } from "react-router-dom"

const { Header, Sider, Content } = Layout;

const handleLogout = () => {
    localStorage.setItem("is_login", "0")
    window.location.href = "/login"
    console.log("Hello")
}
const menu = [
    {
        key: '/',
        icon: <AppstoreFilled />,
        label: 'Dashboard',
    },
    {
        key: '/customer',
        icon: <UsergroupAddOutlined />,
        label: 'Customer',
    },
    {
        key: '/product',
        icon: <FundFilled />,
        label: 'Product',
    },
    {
        key: '/user',
        icon: <UserOutlined />,
        label: 'User',
    },
    {
        key: '/login',
        icon: <UploadOutlined />,
        label: 'Login',
    },
]



const menuUser = [
    {
        key: "1",
        label: (
            <a>
                Profile
            </a>
        )
    },
    {
        key: "2",
        label: (
            <a>
                Change password
            </a>
        )
    },
    {
        // key: "3",
        // label: (
        //     <a>
        //         Logout
        //     </a>
        // ),
        // icon: <LogoutOutlined />,
        // onclick: handleLogout
        key: "3",
        label: (
            <a>
                Logout
            </a>
        ),
        icon: <LogoutOutlined />,
        onClick: handleLogout

    },
]



const profile = JSON.parse(localStorage.getItem("profile"))

const MainLayout = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleMenuChange = (item) => {
        navigate(item.key)
    }


    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" >
                    <h4 >PC</h4>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={menu}
                    onClick={handleMenuChange}
                />
            </Sider>
            <Layout >
                <div className="site-layout">
                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        {React.createElement(collapsed ? MenuFoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </Header>
                    <div>
                        <Dropdown
                            style={{ width: 150 }}
                            menu={{
                                items: menuUser
                            }}
                            placement="bottomLeft"
                        >
                            <Button type="link" className={"iconProfile"}>
                                <UserOutlined />
                                {profile.firstname} {profile.lastname}
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                </div>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <div className='MainBody'>
                        {/* Content */}
                        {props.children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;