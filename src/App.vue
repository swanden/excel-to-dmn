<template>
    <div id="app">
        <!--    <img alt="Vue logo" src="./assets/logo.png">-->
        <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <!--          <h1>Excel to DMN generator</h1>-->
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <router-link to="/simple" active-class="active" class="nav-link">Обычная таблица</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/incidence" active-class="active" class="nav-link">Таблица инцидентности</router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <router-view></router-view>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <h1>User ID: {{ getUserID() }}</h1>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Result</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="10" v-model="xml"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import SimpleTableForm from "./components/SimpleTableForm";
    import axios from 'axios';
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: 'app',
        data() {
            return {
                xml: null
            }
        },
        methods: {
            ...mapActions(
                'tables',
                {setUserID: 'setUserID'}
            ),
            ...mapGetters(
                'tables',
                {getUserID: 'getUserID'}
            ),
        },
        mounted() {
            axios
                .get('http://localhost:3000/')
                .then((response) => {
                    this.xml = response.data.xml;
                    // console.log(this.xml)
                });
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
