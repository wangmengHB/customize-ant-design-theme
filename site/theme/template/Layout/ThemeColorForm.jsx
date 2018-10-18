import React from 'react';
import { Form, Row, Col, Input, Button, Icon, message } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
};


const themes = [
  {
    id: '@primary-color',
    value: '#3FA3FF',
    label: '主题色',
  },
  {
    id: '@heading-color',
    value: '#333B4E',
    label: '标题色',
  },
  {
    id: '@text-color',
    value: '#666F80',
    label: '正文本色',
  },
  {
    id: '@text-color-secondary',
    value: '#A6AEB5',
    label: '次文本色',
  },
  {
    id: '@success-color',
    value: '#7CE5CA',
    label: '成功色',
  },
  {
    id: '@warning-color',
    value: '#FFC8B2',
    label: '警告色',
  },

  {
    id: '@shadow-color',
    value: '#EDF1F4',
    label: '阴影色',
  },
  {
    id: '@table-selected-row-bg',
    value: '#40a9ff',
    label: '表格行选中背景色',
  },

  {
    id: '@modal-mask-bg',
    value: 'rgba(0, 0, 0, 0.2)',
    label: 'mask背景色',
  },

];


class CustomizeThemeForm extends React.Component {
  setTheme = () => {
    const { form: { validateFields } } = this.props;
    validateFields((err, values) => {
      window.console.log('Received values of form: ', values);
      window.less.modifyVars(values).then(() => {
        Icon.setTwoToneColor({ primaryColor: values['@primary-color'] });
        message.success('修改主题成功');
        window.less.refreshStyles();
      });
    });
  }

  handleSetTheme = (e) => {
    e.preventDefault();
    this.setTheme();
  }

  handleReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setTheme();
  }

  // To generate mock Form.Item
  getFields() {
    const { form: { getFieldDecorator } } = this.props;
    const children = [];
    themes.forEach((theme) => {
      children.push(
        <Col span={6} key={theme.id}>
          <FormItem label={theme.label} {...formItemLayout}>
            {getFieldDecorator(theme.id, {
              initialValue: theme.value,
            })(
              <Input placeholder="placeholder" />
            )}
          </FormItem>
        </Col>
      );
    });

    return children;
  }

  componentDidMount() {
    this.setTheme();
  }

  render() {
    return (
      <Form
        onSubmit={this.handleSetTheme}
        style={{ margin: '20px 80px 20px 0px' }}
      >
        <Row type="flex" justify="space-between" gutter={0}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">设置</Button>
            <Button style={{ marginLeft: 20, marginRight: 60 }} onClick={this.handleReset}>
              重置
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}


export default Form.create()(CustomizeThemeForm);
