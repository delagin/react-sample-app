import * as React from 'react';

interface IRedirectHrefProps {
  to: string;
}

export const RedirectHref = (props: IRedirectHrefProps) => {
  const { to } = props;

  window.location.href = to;

  return (
    <pre>Redirecting to <code>{to}</code>...</pre>
  );
};
