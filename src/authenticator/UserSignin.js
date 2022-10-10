import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';

import { Amplify } from "aws-amplify";

import awsmobile from '../aws-exports.js';
Amplify.configure(awsmobile);

function UserSignin() {
    return (
      <Authenticator>
      </Authenticator>
    );
}

export default UserSignin;