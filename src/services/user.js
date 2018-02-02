import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/session/Session',{
    querys:{openid:'E71A6C17E7FAE3981C4F63CBE98A5F43'}
  });
}
