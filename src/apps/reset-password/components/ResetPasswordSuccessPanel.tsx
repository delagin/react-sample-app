import * as React from 'react';
import { Link } from 'react-router-dom';

import { SmallLayoutContainer } from '@common/components';

export const ResetPasswordSuccessPanel: React.StatelessComponent = () => ((
  <SmallLayoutContainer title='Password was successfully changed'>
    <Link to='/login' className='btn btn-primary btn-block'>
      Back to login page
    </Link>
  </SmallLayoutContainer>
));
