import "./UserPage.css"
import moment from "moment"
import { useEffect, useState } from "react";
import { DatePicker, Button, Space, Popconfirm, Input, Modal, Divider, Select, Radio, Table, Tag, Alert, message, ConfigProvider } from "antd"
import { DeleteFilled, EditFilled, SaveFilled, FilterOutlined, EditOutlined, UserOutlined } from "@ant-design/icons"
import { request } from "../../util/api";

import dayjs from 'dayjs';
import 'dayjs/locale/en';
import locale from 'antd/locale/en_US';
import { Config } from "../../util/service";
import Password from "antd/es/input/Password";


const { Option } = Select




const UserPage = () => {
    const [list, setList] = useState([])

    useEffect(() => {
        getUser();
    }, [])

    //create a funtion fetch from api
    const getUser = () => {
        request("get", "user/getUser").then(res => {
            // console.log(res)
            setList(res.data.user_list)
        }).catch(err => {
            console.log(err)
        })
    }

    const [visibleModal, setVisibleModal] = useState(false)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [gender, setGender] = useState("1")
    const [dob, setDob] = useState(dayjs())
    const [tel, setTel] = useState("")
    const [email, setEmail] = useState("")
    const [isActive, setIsActive] = useState(1)
    const [userID, setuserID] = useState(null)
    const [imageProfile, setImageProfile] = useState(null)



    const [columns, setcolumns] = useState([
        {
            title: "No",
            dataIndex: "user_id",
            render: (text, record, index) => index + 1,

        },
        {
            title: "First Name",
            dataIndex: "firstname"
        },
        {
            title: "Last Name",
            dataIndex: "lastname"
        },
        {
            title: "Gender",
            dataIndex: "gender",
            render: (text, record, index) => text == 1 ? "Male" : "Female",
        },
        {
            title: "Date of Birth",
            dataIndex: "dob",
            render: (day_js, dateString) => dayjs(day_js).format("DD-MM-YYYY")

        },
        {
            title: "Phone",
            dataIndex: "tel"
        },
        {
            title: "Email Adress",
            dataIndex: "email"
        },
        {
            title: "Image",
            dataIndex: "profile",
            render: (item) => {
                return (
                    <div style={{ textAlign: 'center' }}>
                        {item != null ?
                            <img
                                src={Config.imagePath + item}
                                alt={item}
                                width={50}
                                height={60}

                            />
                            :

                            <UserOutlined
                                style={{ fontSize: 50 }}
                            />
                        }
                    </div>
                )
            }
        },
        {
            title: "Active",
            dataIndex: "is_active",
            render: (text, record, index) => text == 1 ? (
                <Tag color="#108ee9">Active</Tag>
            ) : (
                <Tag color="#f50">Disable</Tag>
            )



        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => {
                return (
                    <Space>
                        <Popconfirm
                            placement="topRight"
                            title={"Delete"}
                            description={"Are sure to remove this user?"}
                            onConfirm={() => onConfirmDelete(record)}
                            okText="Delete"
                            okType="danger"
                            cancelText="No"
                        >
                            <Button
                                danger={true}
                                type="primary"
                                size="small"
                                style={{
                                    verticalAlign: 'middle',
                                }}
                            >
                                <DeleteFilled />
                            </Button>
                        </Popconfirm>

                        <Button

                            type="primary"
                            size="small"

                            style={{ backgroundColor: "#5591D8", verticalAlign: 'middle' }}
                            onClick={() => handleClickEdit(record)}

                        >
                            <EditOutlined />
                        </Button>
                    </Space>
                )
            }
        },
    ])

    const onConfirmDelete = (item) => {
        request("delete", "user/remove/" + item.user_id).then(res => {
            getUser()
        }).catch(err => {
            console.log(err)
        })
    }
    const handleCancel = () => {
        setVisibleModal(false)
        ClearForm()
    }
    const handleSubmit = () => {
        if (userID == null) {
            var form = new FormData()
            form.append("firstname", firstname)
            form.append("lastname", lastname)
            form.append("gender", gender)
            form.append("dob", dayjs(dob).format("YYYY-MM-DD"))
            form.append("tel", tel)
            form.append("email", email)
            form.append("is_active", isActive)
            form.append("password", 12345678)
            form.append("username", email)
            form.append("myfile", imageProfile, imageProfile.name)


            // request("post", "user/create" {
            //     "firstname": firstname,
            //     "lastname": lastname,
            //     "gender": gender,
            //     "dob": dayjs(dob).format("YYYY-MM-DD"),
            //     "tel": tel,
            //     "email": email,
            //     "is_active": isActive
            // })

            request("post", "user/create", form).then((res) => {
                getUser()
                setTimeout(() => {
                    message.success('Create successfull')
                }, 1000);
                ClearForm()
                setVisibleModal(false)
            }).catch(err => {
                console.log(err)
            })
        } else {
            request("put", "user/update", {
                "user_id": userID,
                "firstname": firstname,
                "lastname": lastname,
                "gender": gender,
                "dob": dayjs(dob).format("YYYY-MM-DD"),
                "tel": tel,
                "email": email,
                "is_active": isActive
            }).then(res => {
                getUser()
                setTimeout(() => {
                    message.success('Update successfull')
                }, 1000);
                ClearForm()
                setVisibleModal(false)
            }).catch(err => {
                console.log(err)
            })
        }
    }
    const handleClickEdit = (item, index) => {
        setVisibleModal(true)

        setFirstname(item.firstname)
        setLastname(item.lastname)
        setGender(item.gender + "")
        setDob(item.dob + "")
        setTel(item.tel)
        setEmail(item.email)
        setIsActive(item.is_active)
        setuserID(item.user_id)
    }
    const handleCloseModal = () => {
        setVisibleModal(false)
        ClearForm();
        setuserID(null)

    }
    const handleOpenModal = () => {
        setVisibleModal(true)

    }
    const ClearForm = () => {
        setFirstname("")
        setLastname("")
        // setGender("")
        setDob(dayjs())
        setTel("")
        setEmail("")
        setIsActive(1)
        setuserID(null)
    }

    const onChanegImageProfile = (e) => {
        setImageProfile(e.target.file[0])
    }
    return (
        <div>
            <div className="rowBetween">
                <div>
                    <Space>
                        <div className="pageTitle">Users</div>
                        <Input.Search placeholder="Search" />
                        <DatePicker />
                        <DatePicker />
                        <button type="button" class="mr-3 text-sm bg-blue-500  text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"><FilterOutlined /></button>
                    </Space>
                </div>
                <button onClick={handleOpenModal} type="button" class="mr-3 text-sm bg-blue-500 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Create User</button>
            </div>
            <Table
                columns={columns}
                dataSource={list}
            />

            {/* Modal input */}
            <Modal
                open={visibleModal}
                title={userID == null ? "Create New User" : "Update User"}
                onCancel={handleCloseModal}
                // onOk={() => { }}
                footer={false}
            >


                <Space direction="vertical" style={{ width: "100%" }}>
                    <Input
                        value={firstname}
                        placeholder="firstname"
                        onChange={(event) => {
                            setFirstname(event.target.value)
                        }}
                    />
                    <Input
                        value={lastname}
                        placeholder="lastname"
                        onChange={(event) => {
                            setLastname(event.target.value)
                        }}
                    />
                    <Select
                        value={gender}
                        defaultValue={"1"}
                        onChange={(value) => {
                            setGender(value)
                        }}
                        style={{ width: "50%" }}>
                        <Option value={"1"}>Male</Option>
                        <Option value={"0"}>Female</Option>
                    </Select>
                    <ConfigProvider locale={locale}>
                        <DatePicker
                            placeholder="Date of Birth"
                            style={{ width: "50%" }}
                            placement="bottomLeft"
                            format={"DD-MM-YYYY"}
                            value={dayjs(dob, "YYYY-MM-DD")}
                            onChange={(date_js, dateString) => {
                                setDob(date_js)
                            }}
                        />
                    </ConfigProvider>
                    <Input
                        value={tel}

                        placeholder="0969224256"
                        onChange={(event) => {
                            setTel(event.target.value)
                        }}
                    />
                    <Input
                        value={email}
                        placeholder="phenhchet@email.com"
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                    />
                    <Radio.Group
                        value={isActive}
                        onChange={(event) => {
                            setIsActive(event.target.value)
                        }}
                    >
                        <Radio value={1}>Active</Radio>
                        <Radio value={0}>Disable</Radio>
                    </Radio.Group>
                    {/* aaa */}
                    <div>
                        <input type={"file"}
                            onChange={onChanegImageProfile}
                        />
                    </div>
                    <Space style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button onClick={handleSubmit} type="primary" style={{ backgroundColor: "#5591D8" }}>{userID == null ? "Save" : "Update"}</Button>
                    </Space>
                </Space>
            </Modal>
        </div>
    );
}

export default UserPage