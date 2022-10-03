import React, { Component } from 'react';
import { Todo } from './Todo/Todo';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <>
        <Todo />
      </>
    );
  }
}
