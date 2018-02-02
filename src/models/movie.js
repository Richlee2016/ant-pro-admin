import { queryHotMovie, addHotMovie,queryMovies } from "../services/api";
import { routerRedux } from 'dva/router';
import { stat } from "fs";

export default {
  namespace: "movie",

  state: {
    hotList: [],
    searchHot: []
  },

  effects: {
    *fetchMovies({payload},{call,put}){
      const response = yield call(queryMovies,payload);
      yield put({
        type: "saveSearchHot",
        payload: response.movies.list
      });
    },
    *fetchHotList(_, { call, put }) {
      const response = yield call(queryHotMovie);
      yield put({
        type: "saveHotList",
        payload: response.movies
      });
    },
    *updateHotMovie({ payload }, { call, put }) {
      const response = yield call(addHotMovie, payload);
      yield put(routerRedux.push('/movie/hot'));
    }
  },
  reducers: {
    saveHotList(state, action) {
      return {
        ...state,
        hotList: action.payload
      };
    },
    saveSearchHot(state, action){
      console.log(action);
      return {
        ...state,
        searchHot:action.payload
      }
    }
  }
};
