/* eslint-disable no-console */
class UserApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(res);
    }
    return res.json();
  }

  registerUser(userData) {
    return fetch(`${this._baseUrl}/users/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        name: userData.name
      })
    }).then((res) => this._getResponseData(res));
  }

  loginUser(userData) {
    return fetch(`${this._baseUrl}/users/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userData.email, password: userData.password })
    }).then((res) => this._getResponseData(res));
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => this._getResponseData(res));
  }

  editUserInfo(name, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    }).then((res) => this._getResponseData(res));
  }

  deleteUser(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => this._getResponseData(res));
  }

  getUserLocations(token) {
    return fetch(`${this._baseUrl}/locations/mylocations`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => this._getResponseData(res));
  }

  createLocation(locationData, token) {
    return fetch(`${this._baseUrl}/locations/mylocations`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: locationData.title,
        text: locationData.text,
        image: locationData.image,
        country: locationData.country
      })
    }).then((res) => this._getResponseData(res));
  }

  deleteLocation(locationId, token) {
    return fetch(`${this._baseUrl}/locations/mylocations/${locationId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => this._getResponseData(res));
  }
}

const userApi = new UserApi({
  baseUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://api.smarttravel.blinklab.com'
      : 'http://localhost:3000'
});

export default userApi;
