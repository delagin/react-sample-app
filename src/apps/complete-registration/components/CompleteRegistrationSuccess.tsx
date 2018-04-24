import * as React from 'react';
import { Link } from 'react-router-dom';

import { SmallLayoutContainer } from '@common/components';

export const CompleteRegistrationSuccess: React.StatelessComponent = () => (
  <SmallLayoutContainer title='Registration complete'>
    <p className='mb-5 text-center'>
      Your are now registered now. Please login and continue the onbording process.
    </p>

    <Link to='/login' className='btn btn-primary btn-block'>
      Back to login page
    </Link>
  </SmallLayoutContainer>
);
