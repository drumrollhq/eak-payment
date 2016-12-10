import EventEmitter from 'events';

class Hindquarters extends EventEmitter
{
    constructor(root)
    {
        super();

        this.root = process.env.EAK_API_URL;
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
          .then(json => (response.status === 200 ? json : Promise.reject(json))));
  }

  _updateUser(user) {
    this._currentUser = user;
    this.emit('user', user);
    return user;
  }

  currentUser() {
    if (this._currentUser) return Promise.resolve(this._currentUser);

    return this.fetch('get', 'v1/users/me')
      .then(user => this._updateUser(user));
  }

  login(username, password) {
    return this.fetch('post', 'v1/auth/login', { username, password })
      .then(user => this._updateUser(user));
  }

  logout() {
    return this.fetch('get', 'v1/auth/logout')
      .then(() => this._updateUser({ loggedIn: false, user: null }))
  }

  ssoCallback(user) {
    this._updateUser({ loggedIn: true, user });
  }

  register(newUser) {
    return this.fetch('post', 'v1/auth/register', newUser)
      .then(user => this._updateUser({ loggedIn: true, user }))
  }

  buy(payload) {
    return this
      .currentUser()
      .then(({ user: { id } }) => this.fetch('post', `v1/users/${id}/buy`, payload))
      .then(user => this._updateUser({ loggedIn: true, user }));
  }
}

export default new Hindquarters();
