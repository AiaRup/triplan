import React, { Component } from 'react';
import PlanTrip from './planTrip/PlanTrip';
import MapView from './mapView/MapView';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex: wrap;
  flex flow: row;
  justify-content: space-around;
`;

const PlanTripContainer = styled.div`
  display: flex;

  height: 80vh;
  width: 50%;
  border: 1px solid lightgrey;
`;

const MapViewContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 80vh;
  width: 50%;
  border: 1px solid lightgrey;
`;

class Content extends Component {
  render() {
    return (
      <React.Fragment>

        <Container>

          <MapViewContainer>
            <MapView />
          </MapViewContainer>

          <PlanTripContainer>
            <PlanTrip />
          </PlanTripContainer>

        </Container>

      </React.Fragment>
    );
  }
}

export default Content;

//!! CAN DELETE
// import { Link } from 'react-router-dom';
// import { withAuth } from '@okta/okta-react';

// export default withAuth(
//   class Content extends Component {
//     state = { authenticated: null };

//     checkAuthentication = async () => {
//       const authenticated = await this.props.auth.isAuthenticated();
//       if (authenticated !== this.state.authenticated) {
//         this.setState({ authenticated });
//       }
//     };

//     async componentDidMount() {
//       this.checkAuthentication();
//     }

//     async componentDidUpdate() {
//       this.checkAuthentication();
//     }

//     login = async () => {
//       this.props.auth.login('/');
//     };

//     logout = async () => {
//       this.props.auth.logout('/');
//     };

//     render() {
//       if (this.state.authenticated === null) return null;

//       const mainContent = this.state.authenticated ? (
//         <div>
//           <p className="lead">
//             You have entered the staff portal,{' '}
//             <Link to="/MyTrips">click here</Link>
//           </p>
//           <button className="btn btn-light btn-lg" onClick={this.logout}>
//             Logout
//           </button>
//         </div>
//       ) : (
//         <div>
//           <p className="lead">
//               If you are a staff member, please get your credentials from your
//               supervisor
//           </p>
//           <button className="btn btn-dark btn-lg" onClick={this.login}>
//               Login
//           </button>
//         </div>
//       );

//       return (
//         <div className="jumbotron">
//           <h1 className="display-4">Triplan</h1>
//           {mainContent}
//         </div>
//       );
//     }
//   }
// );
