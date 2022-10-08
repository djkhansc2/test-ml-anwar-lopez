import './App.css';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Search from './containers/Search/Search';
import Error from './containers/Error/Error';
import Results from './containers/Results/Results';
import Details from './containers/Details/Details';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Search/>,
      errorElement:<Error/>,
      children: [
        {
          path: "/items",
          element: <Results/>,
        },
        {
          path:'/items/:id',
          element: <Details/>
        }
      ],
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
