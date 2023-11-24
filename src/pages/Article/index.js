import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
//翻譯包-時間選擇器
import locale from 'antd/es/date-picker/locale/zh_CN'

import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/logo.png'
import { useChannel } from '@/hooks/useChanel'
import { useEffect, useState } from 'react'
import { getArtcleListAPI } from '@/apis/article'

const { Option } = Select
const { RangePicker } = DatePicker



const Article = () => {
    const{ channelList } = useChannel()
    const status = {
        1:<Tag color="warning">待審核</Tag>,
        2:<Tag color="success">審核通過</Tag>
    }

    const columns = [
        {
          title: '封面',
          dataIndex: 'cover',
          width: 120,
          render: cover => {
            return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
          }
        },
        {
          title: '標題',
          dataIndex: 'title',
          width: 220
        },
        {
          title: '狀態',
          dataIndex: 'status',
          render: data => status[data]
        },
        {
          title: '發布時間',
          dataIndex: 'pubdate'
        },
        {
          title: '閱讀數',
          dataIndex: 'read_count'
        },
        {
          title: '評論數',
          dataIndex: 'comment_count'
        },
        {
          title: '點讚數',
          dataIndex: 'like_count'
        },
        {
          title: '操作',
          render: data => {
            return (
              <Space size="middle">
                <Button type="primary" shape="circle" icon={<EditOutlined />} />
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Space>
            )
          }
        }
      ]

      const data = [
        {
          id: '8218',
          comment_count: 0,
          cover: {
            images: [],
          },
          like_count: 0,
          pubdate: '2019-03-11 09:00:00',
          read_count: 2,
          status: 2,
          title: 'wkwebview離線化加載h5資源解決方案'
        }
      ]

  const [list , setList] = useState([])
  const [count , setCount] = useState(0)
  useEffect(()=>{
    async function getList(){
      const res = await getArtcleListAPI()
      setList(res.data.results)
      setCount(res.data.total_count)
    }
    getList()
  },[])

  const [reqData ,setReqData] = useState({
    status:'',
    channel_id:'',
    begin_pubdata:'',
    end_pubdata:'',
    page:1,
    per_page:4
  })

  const onFinish = (fromValue) => {
    console.log(fromValue)
  }



  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首頁</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}>
          <Form.Item label="狀態" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>審核通過</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="分類" name="channel_id">
            <Select
              placeholder="請選擇文章頻道"
              defaultValue="選擇"
              style={{ width: 120 }}
            >
              {channelList.map(item=><Option key={item.id} value="item.id">{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* locale屬性中文顯示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              篩選
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根據篩選條件共查詢到 ${count} 條結果：`}>
        <Table rowKey="id" columns={columns} dataSource={list} />
      </Card>
    </div>
  )
}

export default Article