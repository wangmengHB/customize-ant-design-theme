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
    id: '@font-size-base',
    value: '14px',
    label: '基准字体大小',
  },

  {
    id: '@font-size-sm',
    value: '12px',
    label: '小号字体大小',
  },

];


class CustomizeThemeForm extends React.Component {
  setTheme = () => {
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
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
    this.props.form.resetFields();
    this.setTheme();
  }

  // To generate mock Form.Item
  getFields() {
    const { getFieldDecorator } = this.props.form;
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
        style={{ margin: '20px 80px 20px 0px'  }}
      >
        <Row type="flex" justify="space-around" gutter={0}>{this.getFields()}</Row>
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
