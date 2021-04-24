(() => {
  class Airport {
    constructor(input) {
      this.icao = input.ICAO;
      this.area = input.Area;
      this.nation = input.Nation;
      this.japanese = input.Japanese;
      this.english = input.English;
    }
  }

  class Aircraft {
    constructor(input) {
      this.abbreviation = input.Abbreviation;
      this.company = input.Company;
      this.modelNumber = input.Model_Number;
      this.capacity = input.Capacity;
    }
  }

  class Flight {
    constructor(input) {
      this.flightNumber = input.Flight_number;
      this.depAirport = airports.find(airport => airport.icao === input.Dep_airport);
      this.arrAirport = airports.find(airport => airport.icao === input.Arr_airport);
      this.depTime = input.Dep_time.split(":").map(i => parseInt(i, 10));
      this.arrTime = input.Arr_time.split(":").map(i => parseInt(i, 10));
      this.aircraft = [input.Aircraft_1, input.Aircraft_2, input.Aircraft_3].filter(Boolean).map(el => aircrafts.find(aircraft => aircraft.abbreviation === el));
      this.cycle = {c: input.Cycle||1, n: input.Number-1||0};
      if(input.Codeshare_company) this.codeShare = {company: input.Codeshare_company, number: input.Codeshare_number, aircraft: input.Codeshare_Aircraft};
      if(input.indirect) this.indirect = input.indirect;

      if(this.arrTime[0] >= 24) { this.arrTime[0] -= 24; this.arrTime.push("翌"); }
    }
  }

  const airports = input.airports.map(airport => new Airport(airport));
  const aircrafts = input.aircrafts.map(aircraft => new Aircraft(aircraft));
  const flights = input.timetable.map(flight => new Flight(flight));
  console.log(flights);
  const exp_arr = flights.map(flight => {
    return `
    <li>
      <div class="flight-info">
        <div class="flight-number">PPY${("000" + flight.flightNumber).slice(-3)}</div>
        <div class="airports">
          <p class="airport-name">${flight.depAirport.japanese}</p>
          <p class="airport-time">${`${("00" + flight.depTime[0]).slice(-2)}:${("00" + flight.depTime[1]).slice(-2)}`}</p>
        </div>
        <div class="arrow"><img src="./imgs/right.svg" alt="→"></div>
        <div class="airports">
          <p class="airport-name">${flight.arrAirport.japanese}</p>
          <p class="airport-time">${`${flight.arrTime[2] || ""}${("00" + flight.arrTime[0]).slice(-2)}:${("00" + flight.arrTime[1]).slice(-2)}`}</p>
        </div>
      </div>
      <div class="notes">
        ${flight.codeShare ? '<p class="codeshare">Sky Connect Air コードシェア便（' + flight.codeShare.aircraft +'機運行)</p>' : ""}
        <p class="aircraft">${
          flight.aircraft.map(i => `${i.company} ${i.modelNumber} (${i.capacity}席)`).reduce((acc, item) => acc + " / " + item)
        }</p>
      </div>
    </li>
    `
  });
  
  const exp_txt = exp_arr.reduce((acc, item) => acc + item);
  document.getElementById("list").innerHTML = exp_txt;
}
)();