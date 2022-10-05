import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';

import Amplify from 'aws-amplify';

import awsExports from '../aws-exports';
Amplify.configure(awsExports);

function UserSignin() {
    return (
      <Authenticator>
      </Authenticator>
    );
}

export default UserSignin;