let cards = document.getElementById("cards")

async function getData()
{
    try
    {
        let response = await axios.get("https://those-who-want-hard-apis.vercel.app/")
        let a = await response.data
        let details = a.data.flights
        console.log("details: ", details);
        let departure = document.getElementById("from").value
        console.log("departure: ", departure);
        let arrival = document.getElementById("to").value
        console.log("arrival: ", arrival);
        
        // console.log("data", details)
        let newArray = []
        for(let i=0;i<details.length;i++){
            for(let j=0;j<details[i].results.j.length;j++){
                if(details[i].results.j[j].leg[0].flights[0].fr == departure && details[i].results.j[j].leg[0].flights[0].to == arrival){
                    console.log("hi");
                    newArray.push(details[i].results.j[j].leg[0].flights[0])
                }
            }
        }
        console.log(newArray)
        
        let card = ""
        if(newArray.length == 0){
            card = "NOT FOUND"
            cards.innerHTML = card
        }
        else{
            for(let i=0;i<newArray.length;i++){
                card +=`<div id="card">
                <h4 id="city"><span id="from">${departure}</span> to<span id="to">${arrival}<span></h4>
                <h2>FROM: <span id="departure">${newArray[i].dt}</span> TO: <span id="arrival">${newArray[i].at}</span></h2>
                <h2 id="flight-name">Flight Name: ${newArray[i].eq}</h2>
                <h2 id="flight-number">Flight Number: ${newArray[i].fn}</h2>
                <h2 id="seat">Seat: ${newArray[i].cc}</h2>
                </div>`
                
            }
            cards.innerHTML = card
    }
    
    }
    catch(error)
    {
        document.getElementById("message").style.display = "inherit"
        console.log(error)
    }
    
}

document.getElementById("submit").addEventListener("click",getData)


// card +=`
// <div id="card">
//     <h4 id="city"><span id="from">Banglore</span> to<span id="to">Chennai<span></h4>
//     <h2>FROM: <span id="departure">7:05</span> TO: <span id="arrival">8:05</span></h2>
//     <h2 id="flight-name">Flight Name: Airbus A315</h2>
//     <h2 id="flight-number">Flight Number: 772</h2>
//     <h2 id="seat">Seat: Economy</h2>
// </div>`
// cards.innerHTML = card