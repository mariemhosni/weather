
let inputSearch = document.getElementById('search')

let btnSearch = document.getElementById('submit')



btnSearch.addEventListener('click' , function(){
  
    console.log( inputSearch.value )


})


// today
let todayName = document.getElementById('today_date_day_name')
let todayNumber = document.getElementById('today_date_day_number')
let todayMonth = document.getElementById('today_date_month')
let todayLocation = document.getElementById('today_location')
let todayTemp = document.getElementById('today_temp')
let todayConditionImg = document.getElementById('today_condition_img')
let todayConditionText = document.getElementById('today_condition_text')
let humidity = document.getElementById('humidity')
let wind = document.getElementById('wind')
let windDirection = document.getElementById('wind_direction')


// next

let nextDay = document.getElementsByClassName('next_day_name')
let nextMaxTemp = document.getElementsByClassName('next_max_temp')
let nextMinTemp = document.getElementsByClassName('next_min_temp')
let nextConditionImg = document.getElementsByClassName('next_condition_img')
let nextConditionText = document.getElementsByClassName('next_condition_text')

// fetch API data

 async function getWeatherData(cityName){

  let weatherResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=2034935c2aa54d7eb31130929242906&q=${cityName}&days=3`)
  let weatherData = await weatherResponse.json()
  
 return weatherData
}

//display today data 

function displayToDayDAta(data)
{
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US" , {weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US" , {month:"long"})
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayConditionImg.setAttribute("src",data.current.condition.icon)
    todayConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+"%"
    wind.innerHTML = data.current.wind_kph+"km/h"
    windDirection.innerHTML = data.current.wind_dir
}




//display next days data

function displayNextData(data){

let forecastData = data.forecast.forecastday

for(let i = 0 ; i < 2 ; i++){

    let nextDate = new Date(forecastData[i+1].date)
    nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US" ,{weekday:"long"})

    nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
    nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
    nextConditionImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
    nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text
}



}



// start data 

async function startApp(city="cairo" ){
 let weatherData = await getWeatherData(city)

 displayToDayDAta(weatherData)
 displayNextData(weatherData)
}

startApp()


inputSearch.addEventListener("input",function(){


    startApp(inputSearch.value)
})



