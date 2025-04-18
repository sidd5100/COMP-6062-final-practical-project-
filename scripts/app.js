// Create a new Vue application
const app = Vue.createApp({
    data(){
        return {
             // User profile data
            user: {
                firstName: '',
                lastName: '',
                age: '',
                picture: ''
            },
            // Weather input details
            weather: {
                city: '',
                province: '',
                country: ''
            },
            
            weatherData: null,
            word: '',
            definition: null
        };
    },

    // Define methods for fetching data from APIs
    methods: {
        // Fetch random user profile data
        fetchUser() {
            fetch('https://comp6062.liamstewart.ca/random-user-profile')
                .then(res => res.json())
                .then(data => {
                    this.user.firstName = data.first_name;
                    this.user.lastName = data.last_name;
                    this.user.age = data.age;
                    this.user.picture = data.profile_picture;
                });
        },

        // Fetch weather information based on user input
        fetchWeather() {
            const { city, province, country } = this.weather;
            const url = `http://comp6062.liamstewart.ca/weather-information?city=${city}&province=${province}&country=${country}`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.weatherData = {
                        temperature: data.temperature,
                        wind: data.wind_speed,
                        description: data.weather_description
                    };
                });
        },

        // Fetch the definition of the entered word
        fetchDefinition() {
            const url = `https://comp6062.liamstewart.ca/define?word=${this.word}`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    const result = data[0];
                    this.definition = {
                        word: result.word,
                        phonetic: result.phonetic,
                        definition: result.definition
                    };
                });
        }
    },

    // Hook that runs when the app is mounted
    mounted(){
        this.fetchUser();
    }
})

// Mount the Vue app
app.mount('#app');
