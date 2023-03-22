import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error: any = useRouteError();
  console.error(error);
  return (
    <>
      <h1>Not found!</h1>
      <p>Sorry, an unexpected error occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </>
  );
};
