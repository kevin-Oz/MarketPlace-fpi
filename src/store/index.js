import Vue from 'vue'
import Vuex from 'vuex'
import { db, storage } from '@/firebase'
import {firestoreAction, vuexfireMutations} from "vuexfire";
Vue.use(Vuex)

export default new Vuex.Store({

  getters: {
    anuncios: state => state.anuncios,
    imagenes: state => state.images,
    imageDetail: state => state.imageDetail
  },
  state: {
    anuncios: [],
    file: null,
    images: [],
    imageDetail: [],
    newId: '',
    searchDisplay: "",

  },
  mutations: {
      setImages(state, imagen){
          state.images.push(imagen);
      },
      setImagesDetail(state,url){
          state.imageDetail.push(url);
      },
      setAnuncio(state, payload){
      state.anuncios = payload
      },
      setFile(state, file){
        state.file = file;
      },
      getidentificador(state, id){
        state.newId = id;
      },
      setDisplay(state, texto){
          state.searchDisplay = texto;
      },
      ...vuexfireMutations,
  },
  actions: {
      bindTodos: firestoreAction(({ bindFirestoreRef }) => {
          // return the promise returned by `bindFirestoreRef`
          return bindFirestoreRef('anuncios', db.collection('anuncios'))
      }),
   async getAnuncios({commit}){
      const anuncios = [];
      await db.collection('anuncios').get().then(res => {
          res.forEach(doc => {
                anuncios.push({ id: doc.id, ...doc.data() });
          });
          commit('setAnuncio', anuncios);
      })
  },
    //idk why, but not works :( 
  async findByRange({commit}, desde, hasta){


    const query = await db
      .collection("anuncios")
      .where("precio", ">=", 100)
      .get();

      query.forEach(querySnapshot => console.log(querySnapshot.data().precio));

   /*  const anuncios = [];
  await db.collection("anuncios").where("precio", ">=", "0").where("precio", "<=", "100").get()
 .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            anuncios.push({ id: doc.id, ...doc.data() });
        });
        commit('setAnuncio', anuncios);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    }); */
  },

   getImages({commit},anuncios) {
       for (let anunciosKey = 0; anunciosKey <  anuncios.length; anunciosKey++) {
           storage.ref().child(`${anuncios[anunciosKey].id}/`)
               .list({maxResults: 1})
               .then((res) => {
                   res.items.forEach((imgRef) => {
                       imgRef.getDownloadURL().then((url) => {
                           commit('setImages', {id: anuncios[anunciosKey].id, urlImage:url});
                       });
                   });
               });
       }
      },
      getAllImages({commit},id){
          const ref = storage.ref()
          console.log('%c getImagenes', 'color:orange')
          //console.log({id});
          ref.child(`${id}/`).listAll()
              .then(function (result) {
                  result.items.forEach(function (imgRef) {
                      //console.log(imgRef.toString());
                      imgRef.getDownloadURL().then(function (url) {
                          //console.log(url)
                          commit('setImagesDetail',url);
                      })
                  })
              });
      },

  agregarAnuncio({commit}, anuncio){
   db.collection('anuncios').add(anuncio).then(doc => {
    commit('getidentificador',doc.id);
   });
  }




  },
  modules: {
  }
})
