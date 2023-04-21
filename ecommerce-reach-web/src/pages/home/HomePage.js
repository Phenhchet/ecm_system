import React from 'react';
import { Button, Result } from 'antd';
const HomePage = () => {
    // <Result
    //     status="404"
    //     title="404"
    //     subTitle="Sorry, the page you visited does not exist."
    // // extra={<Button type="primary">Back Home</Button>}
    // />
    const profile = JSON.parse(localStorage.getItem("profile"))
    console.log(profile)
    return (
        <div>
            <h1>Home Page</h1>
            <Button
                onClick={() => {
                    localStorage.setItem("is_login", "0")
                    window.location.href = "/login"
                }}
            >Logout</Button>
        </div>
    );
}
export default HomePage;