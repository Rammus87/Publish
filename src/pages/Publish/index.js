import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { createArticleAPI, getChannelAPI } from '@/apis/article'

const { Option } = Select
const Publish = () => {
    const [channelList, setChannelList] = useState([])
    useEffect(() => {
        const getChannelList = async () => {
            const res = await getChannelAPI()
            setChannelList(res.data.channels)
        }
        getChannelList()
    }, [])

    const onFinish = (formValue) => {
        console.log(formValue)
        if(imageList.length !== imageType) return message.warning('請上傳足夠數量的封面圖')
        const { title, content, channel_id } = formValue
        const reqData = {
            title,
            content,
            cover: {
                type: imageType,
                images: imageList.map(item => item.response.data.url)
            },
            channel_id
        }
        createArticleAPI(reqData)
    }

    const [imageList, setImageList] = useState([])
    const onUploadChange = (value) => {
        console.log("正在上傳中",value)
        setImageList(value.fileList)
    }

    const [imageType, setImageType] = useState(0)
    const onTypeChange = (value) => {
        console.log("切換封面",value)
        setImageType(value.target.value)
    }

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首頁</Link> },
                        { title: '發布文章' },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="標題"
                        name="title"
                        rules={[{ required: true, message: '請輸入文章標題' }]}
                    >
                        <Input placeholder="請輸入文章標題" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="分類"
                        name="channel_id"
                        rules={[{ required: true, message: '請選擇文章頻道' }]}
                    >
                        <Select placeholder="請選擇文章頻道" style={{ width: 400 }}>
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={0}>無圖</Radio>
                                <Radio value={1}>單圖</Radio>
                                <Radio value={3}>三圖</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imageType > 0 && <Upload
                            //外觀
                            listType="picture-card"
                            //顯示上傳列表
                            showUploadList
                            name="image"
                            //上傳網址
                            action={'http://geek.itheima.net/v1_0/upload'}
                            onChange={onUploadChange}
                            maxCount={imageType}
                        >
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>}
                    </Form.Item>
                    <Form.Item
                        label="內容"
                        name="content"
                        rules={[{ required: true, message: '請輸入文章內容' }]}>
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="請輸入文章內容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                發布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish