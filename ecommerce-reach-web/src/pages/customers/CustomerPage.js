import "./CustomerPage.css"
import moment from "moment"
import axois from "axios"
import * as dayjs from 'dayjs'
import { useEffect, useState } from "react";
import { DatePicker, Button, Space, Popconfirm, Input, Modal, Divider, Select, Radio, Table, Tag, Spin, message, ConfigProvider } from "antd"
import { DeleteFilled, EditFilled, SaveFilled, FilterOutlined, EditOutlined } from "@ant-design/icons"
import { request } from "../../util/api";
import 'dayjs/locale/en';
import locale from 'antd/locale/en_US';


const { Option } = Select




const CustomerPage = () => {

    const [list, setList] = useState([])

    useEffect(() => {
        getList();
    }, [])
    const [visibleModal, setVisibleModal] = useState(false)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [gender, setGender] = useState("1")
    const [dob, setDob] = useState(dayjs()) //return curent date
    const [tel, setTel] = useState("")
    const [email, setEmail] = useState("")
    const [isActive, setIsActive] = useState(1)
    const [customerID, setCustomerId] = useState(null)
    const [loading, setLoading] = useState(false)

    const [textSearch, setTextSearch] = useState("")
    const [page, setPage] = useState(1)


    const [columns, setcolumns] = useState([
        {
            title: "No",
            dataIndex: "customer_id",
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
            // render: (record) => {
            //     return (
            //         <div>
            //             <p> {dayjs(record.dob).format("MMM-DD-YYYY")}</p>
            //         </div>
            //     )
            // }
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
                            description={"Are sure to remove this customer?"}
                            onConfirm={() => onConfirmDelete(record)}
                            okText="Delete"
                            okType="danger"
                            cancelText="No"
                        >
                            <Button
                                danger={true}
                                type="primary"
                                size="small"
                            >
                                <DeleteFilled style={{ verticalAlign: 'middle', marginBottom: 3.7 }} />
                            </Button>
                        </Popconfirm>

                        <Button

                            type="primary"
                            size="small"
                            style={{ backgroundColor: "#5591D8" }}
                            onClick={() => handleClickEdit(record)}

                        >
                            <EditOutlined style={{ verticalAlign: 'middle', marginBottom: 4 }} />
                        </Button>
                    </Space>
                )
            }
        },
    ])



    //create a funtion fetch from api
    const getList = () => {

        request("get", "customer/getList?text_search=" + textSearch).then(res => {
            // setList(res.data.customer_list)
            // setLoading(false)
            if (res) {
                setList(res.data.customer_list)
                setLoading(false)

            } else {
                setLoading(false)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    // const onDelete = (item) => {
    //     axois({
    //         url: "http://localhost:8080/api/customer/remove/" + item.customer_id,
    //         method: "DELETE"
    //     }).then(res => {
    //         getList()
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }
    const onConfirmDelete = (item) => {
        setLoading(true)
        request("delete", "customer/remove/" + item.customer_id).then(res => {
            getList()
            setTimeout(() => {
                message.success('Customer Delete successfull')
            }, 500);
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }
    const handleCancel = () => {
        setVisibleModal(false)
        ClearForm()
    }
    const handleSubmit = () => {
        const data = {
            "firstname": firstname,
            "lastname": lastname,
            "gender": gender,
            "dob": dayjs(dob).format("YYYY-MM-DD"),
            "tel": tel,
            "email": email,
            "is_active": isActive
        }
        setLoading(true)
        if (customerID == null) {
            request("post", "customer/create", data).then(res => {
                getList()
                setTimeout(() => {
                    message.success('Customer Create successfull')
                }, 500);
                ClearForm()
                setVisibleModal(false)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
              });
        } else {
            data.customer_id = customerID
            request("put", "customer/update", data).then(res => {
                getList()
                setTimeout(() => {
                    message.success('Customer Update successfull')
                }, 500);
                ClearForm()
                setVisibleModal(false)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
              });
        }
    }
    const ClearForm = () => {
        setFirstname("")
        setLastname("")
        // setGender("")
        setDob(dayjs())
        setTel("")
        setEmail("")
        setIsActive(1)
        setCustomerId(null)
    }
    const handleCloseModal = () => {
        setVisibleModal(false)
        ClearForm();
        setCustomerId(null)

    }
    const handleOpenModal = () => {
        setVisibleModal(true)

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
        setCustomerId(item.customer_id)
    }
    return (
        <div className="customer_page">
            <Spin spinning={loading}>
                <div className="rowBetween">
                    <div>
                        <Space>
                            <div className="pageTitle">Customer</div>
                            <Input.Search placeholder="Search"
                                onChange={(event) => {
                                    setTextSearch(event.target.value)
                                }}
                            />
                            <DatePicker />
                            <DatePicker />
                            <button type="button" class="mr-3 text-sm bg-blue-500  text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"><FilterOutlined onClick={getList()} /></button>
                        </Space>
                    </div>
                    <button onClick={handleOpenModal} type="button" class="mr-3 text-sm bg-blue-500 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"> New Create</button>
                </div>


                <Table
                    bordered={true}
                    tableLayout="auto"
                    size="middle"
                    columns={columns}
                    dataSource={list}
                    pagination={{
                        // total: 3,
                        // defaultCurrent: 2
                    }}

                />

                {/* Modal input */}
                <Modal
                    open={visibleModal}
                    title={customerID == null ? "Create New Customer" : "Update Customer"}
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
                        <Space style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button onClick={handleSubmit} type="primary" style={{ backgroundColor: "#5591D8" }}>{customerID == null ? "Save" : "Update"}</Button>
                        </Space>
                    </Space>
                </Modal>
            </Spin>
        </div>
    );
}

export default CustomerPage