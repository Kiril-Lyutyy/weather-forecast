<template>
    <nav class="city_search__nav navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <div class="navbar-collapse">
                <form class="form-inline">
                    <div class="city_search__wrapper">
                        <input class="city_search__input form-control"
                               id="app-search"
                               type="search"
                               placeholder="Enter city name"
                               aria-label="Search"
                               v-model="city"
                               @input="getCitiesList($event)"
                               @focus="showAutoComplete">
                        <ul class="city_search__autocomplete"
                            id="auto-complete"
                            v-show="showSearchResults">
                            <li class="autocomplete__item"
                                v-for="item in autoComplete"
                                @click="showThisCityWeather({lat: item.coord.lat, lng: item.coord.lon})">
                                <span class="autocomplete__text">{{ item.name }}, {{ item.sys.country }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="city_search__btn_wrapper">
                        <button class="city_search__btn search btn btn-success"
                                type="submit"
                                @click.prevent="citySearch"
                                :disabled="!city">Search</button>
                        <!--<button class="city_search__btn current_location btn btn-outline-success"
                                type="submit"
                                @click.prevent="getGeoLocation">Get current location</button>-->
                    </div>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
    export default  {
        data() {
            return {
                city: '',
                location: null,
                apiResponse: null,
                autoComplete: null,
                showSearchResults: false,
                requestUrl: 'http://api.openweathermap.org/data/2.5/',
                apiOptions: '&like&units=metric&lang=en',
                apiKey: '&appid=533d93fc441ac60b80130cec8fc31f7d',
            }
        },
        methods: {
            showThisCityWeather: function (coordinates) {
                this.sendRequest({
                    isUserGeolocation: false,
                    latitude: coordinates.lat,
                    longitude: coordinates.lng
                });
                this.showSearchResults = false;
            },
            getGeoLocation: function () {
                this.$watchLocation()
                    .then(coordinates => {
                        //console.log(coordinates)
                        this.sendRequest({
                            isUserGeolocation: true,
                            latitude: coordinates.lat,
                            longitude: coordinates.lng
                        })
                    })
            },
            getCitiesList: function (e) {
                if (e.target.value.length > 2) {
                    this.showSearchResults = true;
                    axios.get(this.requestUrl + 'find?q=' + this.city + this.apiOptions + this.apiKey).then((response) => {
                        this.autoComplete = response.data.list;
                    }).catch((error) => {
                        console.log(error)
                    })
                } else {
                    this.showSearchResults = false;
                }
            },
            citySearch: function () {
                this.sendRequest(this.city)
            },
            sendRequest: function (request) {
                this.location = typeof request === 'string'
                    ? 'weather?q=' + this.city
                    : 'weather?lat=' + request.latitude + '&lon=' + request.longitude;
                axios.get(this.requestUrl + this.location + this.apiOptions + this.apiKey).then((response) => {
                    this.apiResponse = response.data;
                    //console.log(this.apiResponse);
                    this.$emit('serverResponse', {
                        'apiResponse' : this.apiResponse,
                        'isUserGeolocation' : request.isUserGeolocation
                    });
                    this.$noty.success('Weather forecast for ' + response.data.name + ' was successfully loaded!');
                }).catch((error) => {
                    this.$noty.error("No results!");
                    console.log(error)
                })
            },
            hideAutoComplete: function () {
                const autoComplete = document.getElementById('auto-complete');
                document.addEventListener('click', event => {
                    let isClickInside = autoComplete.contains(event.target);
                    if (!isClickInside && event.target.id !== 'app-search') {
                        this.showSearchResults = false;
                    }
                });
            },
            showAutoComplete: function () {
                if (this.city.length !== 0)
                this.showSearchResults = true;
            }
        },
        mounted: function () {
            this.getGeoLocation();
            this.hideAutoComplete();
        },
    }
</script>

<style lang="scss" scoped>
    .city_search__input {
        @media (max-width: 479px) {
            max-width: 150px;
        }
    }
    .city_search__wrapper {
        position: relative;
    }
    .city_search__autocomplete {
        padding: 0;
        position: absolute;
        left: 0;
        top: 37px;
        width: 100%;
        max-width: 300px;
        background: #fff;
        border: 1px solid #ced4da;
        z-index: 100;
    }
    .autocomplete__item {
        list-style: none;
        padding: 10px;
        cursor: pointer;
        &:hover {
            color: #28a745;
        }
        &:not(:last-child) {
            border-bottom: 1px solid #ced4da;
        }
    }
    .city_search__wrapper {
        margin-right: 5px;
    }
    .city_search__btn {
        &.search {
            margin-left: 10px;
        }
    }
</style>