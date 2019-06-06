<template>
    <div id="app">
        <get-weather-forecast @serverResponse="onServerResponse"></get-weather-forecast>
        <show-result :apiResponse="apiResponse" :userGeoLocation="userGeoLocation" @removeCity="onCityRemove"></show-result>
    </div>
</template>

<script>
    import GetWeatherForecast from './components/GetWeatherForecast';
    import ShowResult from './components/ShowResult';
    export default {
        name: 'app',
        data() {
            return {
                apiResponse: [],
                userGeoLocation: [],
            }
        },
        components: {
            'get-weather-forecast': GetWeatherForecast,
            'show-result': ShowResult,
        },
        methods: {
            saveToLocalStorage: function () {
                localStorage.cities = JSON.stringify(this.apiResponse);
            },
            onServerResponse: function (response) {
                if (response.isUserGeolocation === true) {
                    this.$set(this.userGeoLocation, this.userGeoLocation.length, response.apiResponse);
                } else {
                    this.$set(this.apiResponse, this.apiResponse.length, response.apiResponse);
                    this.saveToLocalStorage();
                }
            },
            onCityRemove: function (index) {
                this.$delete(this.apiResponse, index);
                //console.log(this.apiResponse[index]);
                this.$noty.warning('City was removed from list!');
                this.saveToLocalStorage();
            },
            checkLocalStorage: function () {
                if (localStorage.cities) {
                    this.apiResponse = JSON.parse(localStorage.cities);
                }
            },
        },
        mounted() {
            this.checkLocalStorage();
        }
    }
</script>

<style lang="scss">
    @import '../node_modules/vuejs-noty/dist/vuejs-noty.css';
    @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
