import { RouterProvider } from 'react-router-dom';
import { router } from './routing/router';
import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        theme="dark"
        position="bottom-right"
        autoClose={1000}
      />
    </>
  )
};

export default App;