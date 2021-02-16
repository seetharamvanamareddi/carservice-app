// Car class: Represents a Carlist
class Car {
  constructor(custname, custmobile, vehiclenum) {
    this.custname = custname;
    this.custmobile = custmobile;
    this.vehiclenum = vehiclenum;
  }
}
// UI class: handle UI tasks
class UI {
  static displayCars() {
    const cars = Store.getCars();

    cars.forEach((car) => UI.addCarToList(car));
  }
  static addCarToList(car) {
    const list = document.querySelector("#car-list");

    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${car.custname}</td>
    <td>${car.custmobile}</td>
    <td>${car.vehiclenum}</td>

    <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
    `;

    list.appendChild(row);
  }

  static deleteCar(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#car-form");
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#custname").value = "";
    document.querySelector("#custmobile").value = "";
    document.querySelector("#vehiclenum").value = "";
  }
}

// Store class: Handle Storage
class Store {
  static getCars() {
    let cars;

    if (localStorage.getItem("cars") === null) {
      cars = [];
    } else {
      cars = JSON.parse(localStorage.getItem("cars"));
    }
    return cars;
  }
  static addCar(car) {
    const cars = Store.getCars();
    cars.push(car);
    localStorage.setItem("cars", JSON.stringify(cars));
  }
  static removeCar(vehiclenum) {
    const cars = Store.getCars();

    cars.forEach((car, index) => {
      if (car.vehiclenum === vehiclenum) {
        cars.splice(index, 1);
      }
    });

    localStorage.setItem("cars", JSON.stringify(cars));
  }
}

//Event: Display Car
document.addEventListener("DOMContentLoaded", UI.displayCars);

//Event: Add a car
document.querySelector("#car-form").addEventListener("submit", (e) => {
  //prevent actual submit
  e.preventDefault();
  // get form values
  const custname = document.querySelector("#custname").value;
  const custmobile = document.querySelector("#custmobile").value;
  const vehiclenum = document.querySelector("#vehiclenum").value;

  // Validation
  if (
    custname === "" ||
    custmobile === "" ||
    vehiclenum === ""
      ) {
    UI.showAlert("Please fill the details", "danger");
  } else {
    // Instatiate car
    const car = new Car(custname, custmobile, vehiclenum);
    //console.log(car);

    // Add Car to UI
    UI.addCarToList(car);

    // Add Car to store
    Store.addCar(car);

    // Show success message
    UI.showAlert("Car Added Successfully", "success");

    //clear fields
    UI.clearFields();
  }
});

//Event: Remove car from list
document.querySelector("#car-list").addEventListener("click", (e) => {
  UI.deleteCar(e.target);

  // Remove car from store
  Store.removeCar(e.target.parentElement.previousElementSibling.textContent);

  //show success message
  UI.showAlert("Book Removed", "success");
});


