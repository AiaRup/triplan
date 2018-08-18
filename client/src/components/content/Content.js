import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(
  class Content extends Component {


    render() {
      return (
        <div> Content

        </div>
      );
    }
  }
);