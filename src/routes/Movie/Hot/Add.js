import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './Add.less';

const FormItem = Form.Item;
const Search = Input.Search;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ movie,loading }) => ({
  submitting: loading.effects['movie/addHotMovie'],
  searchHot:movie.searchHot
}))
@Form.create()

export default class BasicForms extends PureComponent {
  constructor(props){
    super(props);
  }

  getHotName= name => {
    if(!name) return;
    this.props.dispatch({
      type: 'movie/fetchMovies',
      payload: {name}
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'movie/updateHotMovie',
          payload: values,
        });
      }
    });
  }
  render() {
    const { submitting,searchHot } = this.props;
    const { getFieldDecorator} = this.props.form;
    const homeRedio = searchHot.map((o,i) => {
      console.log(o.id);
      return <Radio key={o.id} value={o.id}><img className={styles.hotImg} src={o.img} /></Radio>
    })
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="基础表单" content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="电影名称"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入电影名',
                }],
              })(
                <div className={styles.movieName}>
                  <Search
                    placeholder="请输入电影名"
                    onSearch={value => {this.getHotName(value)}}
                    enterButton
                  />
                </div>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="电影家园"
            >
            {getFieldDecorator('movieHome', {
              rules: [{
                required: false, message: '请搜索id',
              }],
            })(
              <Radio.Group>
              {homeRedio}
              </Radio.Group>
            )}
            </FormItem>
            <FormItem                                                                                                             
              {...formItemLayout}
              label="在线电影"
            >
              {getFieldDecorator('onlineSrc', {
                rules: [{
                  required: true, message: '请搜索id',
                }],
              })(
                <Input placeholder="请搜索id" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="热门类型"
            >
              {getFieldDecorator('hotType', {
                rules: [{
                  required: true, message: '请选择类型',
                }],
              })(
                <Radio.Group>
                  <Radio value="1">热门推荐</Radio>
                  <Radio value="2">即将上映</Radio>
                  <Radio value="3">经典影片</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="视频地址"
            >
              {getFieldDecorator('videoUrl', {
                rules: [{
                  required: true, message: '请输入视频地址',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入视频地址" rows={4} />
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
