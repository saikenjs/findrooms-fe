import { ComponentType, Fragment, lazy, Suspense } from 'react';
import { Route, Routes as BrowserRoutes } from 'react-router-dom';

interface IRoute {
  default: ComponentType;
}

const PRESERVED = import.meta.globEager('/src/pages/(_app|404).tsx');
const ROUTES = import.meta.glob<IRoute>('/src/pages/**/[a-z[]*.tsx');

const preserved = Object.keys(PRESERVED).reduce(
  (preserved, file) => {
    const key = file.replace(/\/src\/pages\/|\.tsx$/g, '');
    return { ...preserved, [key]: PRESERVED[file].default };
  },
  {
    _app: Fragment,
    404: Fragment,
  }
);

const routes = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/pages|index|\.tsx$/g, '')
    .replace(/\[\.{3}.+\]/, '*')
    .replace(/\[(.+)\]/, ':$1');

  return { path, component: lazy(ROUTES[route]) };
});

export const Routes = () => {
  const App = preserved['_app'];
  const NotFound = preserved['404'];

  return (
    <App>
      <Suspense fallback='Loading...'>
        <BrowserRoutes>
          {routes.map(({ path, component: Component = Fragment }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path='*' element={<NotFound />} />
        </BrowserRoutes>
      </Suspense>
    </App>
  );
};
