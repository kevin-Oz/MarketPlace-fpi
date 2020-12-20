import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/firebase'
Vue.use(Vuex)

export default new Vuex.Store({

  getters: {
    anuncios: state => state.anuncios,
  },
  state: {
    anuncios: [],
    file: null,
    newId: ''
  },
  mutations: {
    setAnuncio(state, payload){
      state.anuncios = payload
  },
      setFile(state, file){
        state.file = file;
      },
      getidentificador(state, id){
        state.newId = id;
      }
  },
  actions: {
    getAnuncios({commit}){
      const anuncios = [];
      db.collection('anuncios').get().then(res => {
          res.forEach(doc => {
                anuncios.push({ id: doc.id, ...doc.data() });
          });
          commit('setAnuncio', anuncios);
      })
  },
  agregarAnuncio({commit}, anuncio){
   db.collection('anuncios').add(anuncio).then(doc => {
    commit('getidentificador',doc.id);
   });
  }
/*
   .then(res => {
          res.forEach(doc => {
             // console.log(doc.id);
              console.log(doc.data());
              let anuncio = doc.data();
            //  this.anuncios.push({ id: doc.id, ...doc.data() });
              anuncios.push(anuncio);
          })
          commit('setAnuncio', anuncios);
      })
 */



  },
  modules: {
  }
})
