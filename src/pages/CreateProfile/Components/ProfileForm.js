import React, { Component } from "react";
import _ from "lodash";
import { Form, Input, Select, DatePicker, Button, AutoComplete } from "antd";
import moment from "moment";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class ProfileForm extends Component {
  state = {
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const result = _.chain(values)
          .set("dob", values.dob._d.toISOString())
          .omit("prefix")
          .omitBy(_.isUndefined)
          .value();
        this.props.onSubmit(result);
      }
    });
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "91"
    })(
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
        <Option value="1">+1</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form
        className="profile-form"
        {...formItemLayout}
        onSubmit={this.handleSubmit}
      >
        <Form.Item label="Name">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please input your name!"
              }
            ],
            initialValue: this.props.profile ? this.props.profile.name : ""
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Mobile Number">
          {getFieldDecorator("mobile_no", {
            rules: [
              { required: true, message: "Please input your mobile number!" }
            ],
            initialValue: this.props.profile ? this.props.profile.mobile_no : ""
          })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
        </Form.Item>
        <Form.Item label="Gender">
          {getFieldDecorator("gender", {
            rules: [{ required: true, message: "Please select your gender!" }],
            initialValue: this.props.profile ? this.props.profile.gender : ""
          })(
            <Select>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="trans">Transgender</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="DOB">
          {getFieldDecorator("dob", {
            rules: [
              {
                type: "object",
                required: true,
                message: "Please select your date of birth!"
              }
            ],
            initialValue: this.props.profile
              ? moment(this.props.profile.dob)
              : ""
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item label="Bio">
          {getFieldDecorator("bio", {
            rules: [
              {
                message: "Enter a few lines about yourself!"
              }
            ],
            initialValue:
              this.props.profile && this.props.profile.bio
                ? this.props.profile.bio
                : ""
          })(<Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
        </Form.Item>
        <Form.Item label="Website">
          {getFieldDecorator("website", {
            initialValue:
              this.props.profile && this.props.profile.website
                ? this.props.profile.website
                : ""
          })(
            <AutoComplete
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
            >
              <Input />
            </AutoComplete>
          )}
        </Form.Item>
        <Form.Item label="Languages">
          {getFieldDecorator("languages", {
            rules: [{ required: true, message: "Please select languages!" }],
            initialValue: this.props.profile ? this.props.profile.languages : []
          })(
            <Select mode="multiple">
              <Option value="english">English</Option>
              <Option value="hindi">Hindi</Option>
              <Option value="french">French</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Address">
          {getFieldDecorator("address", {
            rules: [{ required: true, message: "Please enter your  address!" }],
            initialValue: this.props.profile ? this.props.profile.address : ""
          })(<Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={this.props.loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(ProfileForm);

export default WrappedRegistrationForm;
