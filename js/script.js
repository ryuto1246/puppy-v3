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
      this.modelNumber = input.Model_number;
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
      if(input.indirect) this.codeShare = {company: input.Codeshare_company, number: input.Codeshare_number, aircraft: input.Codeshare_aircraft};
      if(input.indirect) this.indirect = input.indirect;
    }
  }

  const airports = input.airports.map(airport => new Airport(airport));
  const aircrafts = input.aircrafts.map(aircraft => new Aircraft(aircraft));
  const flights = input.timetable.map(flight => new Flight(flight));
}
)();