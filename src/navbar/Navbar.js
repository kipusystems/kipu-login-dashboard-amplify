import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class Navbar extends Component {

  signOut() {
    try {
        Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

  render() {
    return (
      <div>
        <header className="tw-bg-k-purple tw-py-5 tw-shadow-sm lg:tw-static lg:tw-overflow-y-visible">
          <div className="tw-text-right tw-px-4">
            { this.props.currentUser.email === '' ? '' : <button className="tw-inline-flex tw-justify-center tw-px-4 tw-border-2 tw-border-transparent tw-font-semibold tw-rounded-full tw-uppercase hover:tw-cursor-pointer tw-text-sm tw-py-2 tw-text-white tw-bg-k-dark-blue active:tw-bg-k-dark-blue hover:tw-bg-k-true-blue focus:tw-outline-none focus:tw-bg-k-true-blue focus:tw-ring-2 focus:tw-ring-k-dark-blue disabled:tw-bg-k-gray-300 disabled:tw-text-k-gray-700 tw-shadow-md" onClick={this.signOut.bind(this)}>Sign Out</button>}  
          </div>
        </header>
      </div>
    );
  }
}

export default Navbar;