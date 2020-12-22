//Event listener to fetch planetary json data.  .then used to handle promises
window.addEventListener("load", () => {
   
   //Initializing ID items
   let pilotNameInput = document.querySelector("input[name=pilotName]");
   let copilotNameInput = document.querySelector("input[name=copilotName]");
   let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
   let cargoMassInput = document.querySelector("input[name=cargoMass]");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let missionTarget = document.getElementById("missionTarget");
   let faultyItems = document.getElementById("faultyItems");
   let launchStatus = document.getElementById("launchStatus");
   let formSubmit = document.getElementById("formSubmit");


   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(res) {
         res.json().then(function(json) {
         missionTarget.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[0].name}</li>
               <li>Diameter: ${json[0].diameter}</li>
               <li>Star: ${json[0].star}</li>
               <li>Distance from Earth: ${json[0].distance}</li>
               <li>Number of Moons: ${json[0].moons}</li>
         </ol>
         <img src="${json[0].image}"></img>
         `; 
         });
   });

   //Event listener for the submit button when clicked
   formSubmit.addEventListener("click", function(event){
   
      if (pilotNameInput.value === "" || 
         copilotNameInput.value === "" ||
         fuelLevelInput.value === "" ||
         cargoMassInput.value === ""
      ) {
         alert("All fields are required.");
         event.preventDefault();
      } else {
       pilotStatus.innerText = `Pilot ${pilotNameInput.value} is ready for launch!`;
       copilotStatus.innerText = `Co-pilot ${copilotNameInput.value} is ready for launch!`;
       systemsCheck();
      }

    
    function systemsCheck(){
      if (isNaN(cargoMassInput.value) || isNaN(fuelLevelInput.value)){
         window.alert("Make sure to enter valid information for each field!")
         event.preventDefault();
         } else {
            fuelCheck();
         }
      }

      
      function fuelCheck(){
         if (fuelLevelInput.value < 10000){
            fuelStatus.innerText = "Fuel level is too low to launch."
            shuttleNotReady();
         } else if (fuelLevelInput.value >= 10000){
            fuelStatus.innerText = "Fuel level is high enough to launch."
            shuttleReady();
         } else {
            cargoCheck();
         }
      }

      function cargoCheck(){
         if (cargoMassInput.value > 10000){
            cargoStatus.innerText = "Mass is too high for the shuttle launch."
            shuttleNotReady();
         } else if (cargoMassInput.value <= 10000){
            cargoStatus.innerText = "Mass is low enough for shuttle launch."
            shuttleReady();
         }
      }

      function shuttleReady(){
         launchStatus.style.color = "green";
         launchStatus.innerText = "Shuttle is ready for launch";
         faultyItems.style.visibility = "visible";
         event.preventDefault();
      }

      function shuttleNotReady(){
         launchStatus.style.color = "red";
         launchStatus.innerText = "Shuttle not ready for launch."
         faultyItems.style.visibility = "visible";
         event.preventDefault();
      }

   });

});