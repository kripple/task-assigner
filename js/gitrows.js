// this temp token only has access to public repos in a completely separate github account
// another option might be to have the user input the token
const options = {
  branch: 'main',
  user: 'kripple-public',
  token: '',
  message: 'GitRows API Post (https://gitrows.com)',
  author: { name: 'GitRows', email: 'api@gitrows.com' },
  // strict: true,
  // columns: []
}

const gitrows = new Gitrows(options);
const gitrowsPath = '@github/kripple-public/data/task-assigner/';


const getData = (path, filter = {}, action = 'fetch') => {
  // 'pull' is faster than 'fetch', but is subject to rate limits

  return gitrows.get(`${gitrowsPath}${path}`, filter, action)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

const replaceData = (path, data) => {

  return gitrows.replace(`${gitrowsPath}${path}`, data)
    .then((response) => {
      //handle response, which has the format (Object){code:200,description='OK'}
      console.log(response);
      return response;
    })
    .catch((error) => {
      //handle error, which has the format (Object){code:http_status_code,description='http_status_description'}
      console.error(error);
    });
}
