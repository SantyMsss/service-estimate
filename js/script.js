// Función para crear un nuevo combobox
function addServiceType(event) {
  event.preventDefault();
  const container = document.getElementById("serviceTypeContainer");

  const newDiv = document.createElement("div");
  newDiv.className = "mb-3 service-type-wrapper";

  const newLabel = document.createElement("label");
  newLabel.className = "form-label";
  newLabel.innerHTML = `Service Type`;
  newLabel.setAttribute("for", `serviceType`);

  const newSelect = document.createElement("select");
  newSelect.className = "form-select";
  newSelect.setAttribute("id", `serviceType`);
  newSelect.setAttribute("name", `serviceType`);
  newSelect.setAttribute("required", true);
  
  const options = `
      <option value="" selected disabled>Opción</option>
      <option value="living-room" data-price="30">Living room - $30</option>
      <option value="kitchen" data-price="40">Kitchen - $40</option>
      <option value="entry" data-price="30">Entry - $30</option>
      <option value="hallbath" data-price="20">Hallbath - $20</option>
      <option value="bedroom" data-price="50">Bedroom - $50</option>
      <option value="bathroom" data-price="10">Bathroom - $10</option>
      <option value="laundry" data-price="20">Laundry - $20</option>
  `;
  
  newSelect.innerHTML = options;

  newDiv.appendChild(newLabel);
  newDiv.appendChild(newSelect);
  container.appendChild(newDiv);

  // Añadir evento change al nuevo select
  newSelect.addEventListener('change', updateTotal);
}

// Función para eliminar el último combobox
function removeServiceType(event) {
  event.preventDefault();
  const container = document.getElementById("serviceTypeContainer");
  const serviceTypeWrappers = document.getElementsByClassName("service-type-wrapper");

  if (serviceTypeWrappers.length > 1) {
      const lastSelect = serviceTypeWrappers[serviceTypeWrappers.length - 1].querySelector('select');
      const lastPrice = lastSelect.options[lastSelect.selectedIndex]?.dataset.price;
      if (lastPrice) {
          total -= parseFloat(lastPrice);
      }
      container.removeChild(serviceTypeWrappers[serviceTypeWrappers.length - 1]);
      updateTotal(); // Actualizar el total después de eliminar
  } else {
      alert("No se puede eliminar el único Service Type restante.");
  }
}

// Función para actualizar el total
function updateTotal() {
  total = 0; // Reiniciar el total
  const serviceTypes = document.querySelectorAll('select[id="serviceType"]');

  serviceTypes.forEach(select => {
      const price = select.options[select.selectedIndex]?.dataset.price;
      if (price) {
          total += parseFloat(price);
      }
  });

  document.getElementById('total').value = total; // Actualizar el campo total
}

// Agregar eventos a los botones
document.getElementById("addServiceButton").addEventListener("click", addServiceType);
document.getElementById("removeServiceButton").addEventListener("click", removeServiceType);

// Agregar evento al primer select existente
const firstSelect = document.querySelector('select[id="serviceType"]');
if (firstSelect) {
  firstSelect.addEventListener('change', updateTotal);
}



function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Obtener los valores de los campos
  const customer = document.getElementById('customer').value;
  const address = document.getElementById('Address').value;
  const city = document.getElementById('city').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const estimateDate = document.getElementById('estimatedate').value;
  const leadSource = document.getElementById('leadsource').value;
  const zip = document.getElementById('zip').value;
  const time = document.getElementById('time').value;
  const attendant = document.getElementById('attendant').value;
  const total = document.getElementById('total').value;
  const pets = document.getElementById('pets').value;
  const keyReceived = document.getElementById('key').value;
  const preferredServiceDay = document.getElementById('serviceday').value;
  const serviceStartDay = document.getElementById('servicestartday').value;
  const windowOfArrival = document.getElementById('windowOfArrival').value;
  const squareFootage = document.getElementById('squareFootage').value;
  const bathrooms = document.getElementById('bathrooms').value;
  const bedrooms = document.getElementById('bedrooms').value;
  const frequency = document.getElementById('frequency').value;
  const serviceFee = document.getElementById('servicefee').value;
  const tax = document.getElementById('tax').value;

  // Agregar contenido al PDF
  doc.text(`Customer: ${customer}`, 10, 10);
  doc.text(`Address: ${address}`, 10, 20);
  doc.text(`City: ${city}`, 10, 30);
  doc.text(`Phone: ${phone}`, 10, 40);
  doc.text(`Email: ${email}`, 10, 50);
  doc.text(`Estimate Date: ${estimateDate}`, 10, 60);
  doc.text(`Lead Source: ${leadSource}`, 10, 70);
  doc.text(`Zip: ${zip}`, 10, 80);
  doc.text(`Time: ${time}`, 10, 90);
  doc.text(`Attendant: ${attendant}`, 10, 100);
  doc.text(`Total: $${total}`, 10, 110);
  doc.text(`Pets: ${pets}`, 10, 120);
  doc.text(`Key Received: ${keyReceived}`, 10, 130);
  doc.text(`Preferred Service Day: ${preferredServiceDay}`, 10, 140);
  doc.text(`Service Start Day: ${serviceStartDay}`, 10, 150);
  doc.text(`Window of Arrival: ${windowOfArrival}`, 10, 160);
  doc.text(`Square Footage: ${squareFootage}`, 10, 170);
  doc.text(`Number of Bathrooms: ${bathrooms}`, 10, 180);
  doc.text(`Number of Bedrooms: ${bedrooms}`, 10, 190);
  doc.text(`Frequency of Service: ${frequency}`, 10, 200);
  doc.text(`Service Fee: $${serviceFee}`, 10, 210);
  doc.text(`Tax: $${tax}`, 10, 220);

  // Descargar el PDF
  doc.save('registro.pdf');
}

// Agregar evento al botón de registrar
document.querySelector('button[type="submit"]').addEventListener('click', function(event) {
  event.preventDefault(); // Evitar el envío del formulario
  generatePDF(); // Generar el PDF
});


// Agregar evento al botón de registrar
document.querySelector('button[type="submit"]').addEventListener('click', function(event) {
  event.preventDefault(); // Evitar el envío del formulario
  generatePDF(); // Generar el PDF
});


function getSelectedServices() {
  const selectedServices = [];
  const serviceTypes = document.querySelectorAll('[id^="serviceType"]');
  
  serviceTypes.forEach(select => {
      const price = select.options[select.selectedIndex]?.dataset.price;
      const value = select.value;

      if (value && price) {
          selectedServices.push(`${value.charAt(0).toUpperCase() + value.slice(1)} - $${price}`);
      }
  });

  return selectedServices.join(', ');
}
