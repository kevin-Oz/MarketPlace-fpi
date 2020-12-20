<template>
  <div>
    <template>
      <div class="text-center">
        <v-dialog v-model="dialog"  persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="red lighten-2"
              dark
              v-bind="attrs"
              v-on="on"
              fab
              icon
              outlined
            >
              <v-icon color="black">mdi-plus</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2">
              Nuevo anuncio
            </v-card-title>

            <v-container>
              <v-row>
                <v-col xl="12" lg="12">
                  <template>
                    <v-stepper v-model="stepper" vertical>
                      <v-stepper-step :complete="stepper > 1" step="1">
                        Información del Producto
                        <small>* obligatorios</small>
                      </v-stepper-step>
                      <v-stepper-content step="1">
                        <v-card color="grey lighten-1" class="mb-12">
                          <template>
                            <v-form ref="frmProducto">
                              <v-container>
                                <v-radio-group v-model="anuncio.estado" row dense>
                                  Estado:
                                  <v-radio
                                    label="Nuevo"
                                    value="nuevo"
                                  ></v-radio>
                                  <v-radio
                                    label="Usado"
                                    value="usado"
                                  ></v-radio>
                                </v-radio-group>
                                <v-row>
                                  <v-col cols="12" md="6">
                                    <v-text-field
                                      v-model="anuncio.marca"
                                      :rules="[v => !!v || 'La marca es requerida']"
                                      label="Marca*"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" md="6">
                                    <v-text-field
                                      v-model="anuncio.modelo"
                                      label="Modelo*"
                                      :rules="[v => !!v || 'Agregue el modelo']"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <v-col class="d-flex" cols="12" sm="10">
                                    sistema Operativo* :
                                    <v-select
                                      :items="sistemas"
                                      filled
                                      v-model="anuncio.sistema"
                                      :rules="[v => !!v || 'Seleccione un S.O.']"
                                      label="Sistema"
                                    ></v-select>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-text-field
                                      v-model="anuncio.pantalla"
                                      label="pantalla"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-text-field
                                      v-model="anuncio.ram"
                                      label="RAM"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-text-field
                                      v-model="anuncio.rom"
                                      label="ROM"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-form>
                          </template>
                        </v-card>
                        <v-btn color="primary" @click="validateProducto">
                          Continue
                        </v-btn>
                        <v-btn text @click="clearForm"> Cancel </v-btn>
                      </v-stepper-content>
                      <v-stepper-step :complete="stepper > 2" step="2">
                        Información de la venta
                      </v-stepper-step>

                      <v-stepper-content step="2">
                        <v-card color="grey lighten-1" class="mb-12">
                          <v-form ref="frmVenta">
                            <v-container>
                              <v-row>
                          <v-col cols="12" md="12">
                            <v-text-field
                              v-model="anuncio.titulo"
                              label="Titulo del anuncio*"
                              :rules="[v => !!v || 'titulo es requerido']"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-row>
                            <v-col cols="12" md="6">
                              <v-text-field
                                v-model="anuncio.vendedor"
                                :rules="[v => !!v || 'vendedor es requerido']"
                                label="Vendedor*"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                              <v-text-field
                                v-model="anuncio.contacto"
                                label="# Telefono*"
                                :rules="[v => !!v || 'Contacto es requerido']"
                                required
                                type="number"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-col cols="12" md="6">
                            <v-text-field
                              v-model="anuncio.precio"
                              :rules="[v => !!v || 'precio es requerido']"
                              label="Precio*"
                              prepend-icon="mdi-currency-usd"
                              type="number"
                              required
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" md="10">
                            <v-textarea
                              v-model="anuncio.descripcion"
                              label="Descripción"
                            ></v-textarea>
                          </v-col>
                              </v-row>
                            </v-container>
                          </v-form>
                        </v-card>
                        <v-btn color="primary" @click="addAnuncio">
                          Continue
                        </v-btn>
                        <v-btn text @click="clearForm"> Cancel </v-btn>
                      </v-stepper-content>

                      <v-stepper-step :complete="stepper > 3" step="3">
                        Cargar Imagenes
                      </v-stepper-step>

                      <v-stepper-content step="3">
                        <v-card
                          color="grey lighten-1"
                          class="mb-12"
                          height="200px"
                        >

                          <v-file-input
                            accept="image/png, image/jpeg, image/bmp"
                            v-model="file"
                            prepend-icon="mdi-camera"
                            label="seleccione la imagen"
                            show-size
                            outlined
                            color="secondary"
                            counter
                          ></v-file-input>

                          <v-btn
                              @click="addToList()"
                              :disabled="file == null"
                              class="d-inline"
                          >añadir</v-btn>

                          <ul v-for="image in files">
                            <li v-if="files.length<1">sin imagenes</li>
                            <li>{{image.name}}</li>
                          </ul>

                        </v-card>
                        <v-btn
                            @click="addFile()"
                            :disabled="files === []"
                            class="d-inline"
                            color="primary"
                        >Publicar images</v-btn>
                      </v-stepper-content>

                    </v-stepper>
                  </template>
                </v-col>
              </v-row>
              <v-row></v-row>
            </v-container>

          </v-card>
        </v-dialog>
      </div>
    </template>
  </div>
</template>

<script>
import { storage } from "@/firebase";
import { mapActions, mapState } from "vuex";

export default {
  name: "NuevoAnuncio",
  data() {
    return {
      stepper: 1,
      sistemas: ["IOS", "Android", "Windows"],
      dialog: false,
      file: null,
      files: [],
      anuncio: {
        titulo: "",
        vendedor: "",
        ram: "",
        rom: "",
        pantalla: "",
        modelo: "",
        marca: "",
        estado: "nuevo",
        contacto: "",
        descripcion: "",
        precio: null,
        sistema: "",
        fecha: Date.now()
      },
    };
  },


  computed: {
    ...mapState(["newId"]),
  },


  methods: {
    ...mapActions(["agregarAnuncio"]),
    resetData(){
      this.anuncio = {
        titulo: "",
            vendedor: "",
            ram: "",
            rom: "",
            pantalla: "",
            modelo: "",
            marca: "",
            estado: "nuevo",
            contacto: "",
            descripcion: "",
            precio: null,
            sistema: "",
            fecha: Date.now()
      }
    },
    addAnuncio() {
      if (this.$refs.frmVenta.validate()) {
        this.agregarAnuncio(this.anuncio);
        this.stepper = 3;
      }
    },
    addToList(){
      this.files.push(this.file);
      this.file = null;
    },
    addFile() {
      console.log(this.files);
      for (let i = 0; i < this.files.length; i++) {
        const imageRef = storage.ref().child(`${this.newId}/${this.files[i].name}`);
        imageRef.put(this.files[i]).then(function() {
          console.log("Uploaded file!");
        });
      }
      this.clearForm();
      },
    clearForm(){
      this.$refs.frmProducto.reset();
      this.$refs.frmVenta.reset();
      this.files = [];
      this.dialog = false;
      this.stepper = 1;
      this.resetData();
    },
    validateProducto() {
    if(this.$refs.frmProducto.validate()){
      this.stepper = 2;
    }
    },
  },
};
</script>

<style scoped></style>
