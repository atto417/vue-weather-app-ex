import { createStore } from 'vuex';

// store  만들기
export default createStore({
    state: {
        // initial state
        count: 0, //변수
        weatherData: {
            icon: 'icon',
            temp: 0,
            text: 'text',
            location: 'location',
            city: 'Seoul',
        },
        toggle: false, // true일때 About 보여준다
    },
    //변경함수
    mutations: {
        // mutations(데이터 변경)
        // mutations 함수를 호출할땐 commit으로 불러옴
        addCount(state, palyload){
            state.count += 1 + palyload;
        },
        updateWeather(state, payload) {
            state.weatherData = payload;
            state.weatherData.icon = payload.weather[0].icon;
            state.weatherData.temp = payload.main.temp;
            state.weatherData.text = payload.weather[0].description;
            state.weatherData.location = payload.sys.country;
            state.weatherData.city = payload.name;
        },
        onSearchCity(state, payload) {
            state.weatherData.city = payload;
        },
        toggleButton(state) {
            state.toggle = !state.toggle;
        }
    },
    actions: {
        //getWeather 액션함수
        //context 객체를 통해 store안에 있는 state 변수를 가져옴
        getWeather(context) {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${context.state.weatherData.city}&appid=${API_KEY}`
            fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                //액션함수는 dispatch라는 함수로 호출한다
                console.log(data);
                // mutation 함수로 날씨 정보 업데이트
                context.commit('updateWeather', data);
            })
            .catch(err => {
                alert('에러가 발생했습니다. 잠시 후 다시 시도해 주세요.')
            })
        }
    }

});