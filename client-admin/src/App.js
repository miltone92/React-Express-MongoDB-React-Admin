import React from 'react';
import { Admin, Resource, fetchUtils } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
// import PostList from './components/PostList';
// import PostCreate from './components/PostCreate';
// import PostEdit from './components/PostEdit';
import UserList from './components/UserList';
import UserCreate from './components/UserCreate';
import UserEdit from './components/UserEdit';

const apiUrl = 'http://localhost:3000/api/';
const httpClient = fetchUtils.fetchJson;

const myDataProvider = {
  ...restProvider,
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${JSON.stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      data: json.map((record) => ({ id: record._id, ...record })),
      total: 10, //temporary hardcoded to avoid headers error.
      //total: parseInt(headers.get('content-range').split('/').pop(), 10),
    }));
  },
};

function App() {
  return (
    <Admin dataProvider={myDataProvider}>
      {/* <Resource
        name='posts'
        list={PostList}
        create={PostCreate}
        edit={PostEdit}
      /> */}
      <Resource
        name='users'
        list={UserList}
        // create={UserCreate}
        // edit={UserEdit}
      />
    </Admin>
  );
}

export default App;
