import EventEmitter from 'events';

class Hindquarters extends EventEmitter {
  constructor(root) {
    super();
    this.root = root;
  }

  fetch(method, url, body) {
    const options = {
      method,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': body ? 'application/json; charset=utf-8' : undefined,
      },
    };

    return fetch(`${this.root}/${url}`, options)
      .then(response =>
        response
          .json()
          .then(json => (response.status === 200 ? json : Promise.reject(json))))
      .then(response => console.log(response) || response);
  }

  _updateUser(user) {
    this._currentUser = user;
    this.emit('user', user);
  }

  currentUser() {
    if (this._currentUser) return Promise.resolve(this._currentUser);

    return this.fetch('get', 'v1/users/me')
      .then(user => {
        this._updateUser(user);
        return user;
      });
  }

  login(username, password) {
    return this.fetch('post', 'v1/auth/login', { username, password })
      .then(user => {
        this._updateUser(user);
        return user;
      });
  }
}

export default new Hindquarters('https://api.eraseallkittens.com');
