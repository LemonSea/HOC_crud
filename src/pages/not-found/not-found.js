import React, { Component } from "react";
import {
  Button,
  Result
} from 'antd';

export default class NotFound extends Component {

  goHome = () => {
    this.props.history.replace('/home')
  }

  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={this.goHome}>Back Home</Button>}
      />
    )
  }
}