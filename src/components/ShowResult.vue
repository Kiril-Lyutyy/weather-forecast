<template>
    <div class="container">
        <!--user location-->
        <div v-show="userGeoLocation.length !== 0"
             class="city__wrapper">
            <h2>Your current location</h2>
            <div class="city__wrapper card" v-for="(thisCity, index) in userGeoLocation">
                <div class="city__item card-header bg-success text-white">
                    <div class="row clearfix">
                        <div class="col">
                            <h4 class="city__name">{{ thisCity.name }}, {{ thisCity.sys.country }}</h4>
                        </div>
                    </div>

                </div>
                <div class="card-body row">
                    <div class="col-auto">
                        <ul class="city__list">
                            <li class="city__item"><b class="city__item_title">Geo coords: </b>[{{ thisCity.coord.lon }}, {{ thisCity.coord.lat }}]</li>
                            <li class="city__item"><b class="city__item_title">Cloudiness: </b>{{ thisCity.weather[0].description }}</li>
                            <li class="city__item"><b class="city__item_title">Wind speed: </b>{{ thisCity.wind.speed }}</li>
                            <li class="city__item"><b class="city__item_title">Wind deg: </b>{{ thisCity.wind.deg  }}</li>
                        </ul>
                    </div>
                    <div class="col-auto">
                        <ul class="city__list">
                            <li class="city__item"><b class="city__item_title">current temp: </b>{{ thisCity.main.temp }} C</li>
                            <li class="city__item"><b class="city__item_title">max temp: </b>{{ thisCity.main.temp_max }} C</li>
                            <li class="city__item"><b class="city__item_title">min temp: </b>{{ thisCity.main.temp_min }} C</li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>
        <!--searched cities-->
        <div v-show="apiResponse.length !== 0"
             class="city__wrapper">
            <h2>Searched cities</h2>
            <div class="city__wrapper card" v-for="(thisCity, index) in apiResponse">
                <div class="city__item card-header bg-info text-white">
                    <div class="row clearfix">
                        <div class="col">
                            <h4 class="city__name">{{ thisCity.name }}, {{ thisCity.sys.country }}</h4>
                        </div>
                        <div class="col">
                            <button type="button"
                                    class="btn btn-light city__delete_btn"
                                    @click="removeCity(index)">Remove city</button>
                        </div>
                    </div>

                </div>
                <div class="card-body row">
                    <div class="col-auto">
                        <ul class="city__list">
                            <li class="city__item"><b class="city__item_title">Geo coords: </b>[{{ thisCity.coord.lon }}, {{ thisCity.coord.lat }}]</li>
                            <li class="city__item"><b class="city__item_title">Cloudiness: </b>{{ thisCity.weather[0].description }}</li>
                            <li class="city__item"><b class="city__item_title">Wind speed: </b>{{ thisCity.wind.speed }}</li>
                            <li class="city__item"><b class="city__item_title">Wind deg: </b>{{ thisCity.wind.deg  }}</li>
                        </ul>
                    </div>
                    <div class="col-auto">
                        <ul class="city__list">
                            <li class="city__item"><b class="city__item_title">current temp: </b>{{ thisCity.main.temp }} C</li>
                            <li class="city__item"><b class="city__item_title">max temp: </b>{{ thisCity.main.temp_max }} C</li>
                            <li class="city__item"><b class="city__item_title">min temp: </b>{{ thisCity.main.temp_min }} C</li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: ['apiResponse', 'userGeoLocation'],
        methods: {
            removeCity: function (index) {
                //console.log(index)
                this.$emit('removeCity', index);
            },
        },
    }
</script>

<style lang="scss" scoped>
    .city {
        &__wrapper {
            margin-top: 20px;
        }
        &__list {
            padding: 0;
            margin: 0;
        }
        &__item {
            list-style: none;
            font-size: 14px;
            &_title {
                color: #7d7d7d;
            }
        }
        &__delete_btn {
            float: right;
        }
        &__name {
            display: inline-block;
            //color: #7d7d7d;
        }
        &__country {

        }
    }
</style>