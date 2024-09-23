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
      <option value="" selected disabled>Option</option>
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


document.getElementById('generatePdfBtn').addEventListener('click', function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    unit: "mm",
    format: "a4",
    orientation: "portrait",
    compress: true // Asegúrate de que esta opción esté habilitada
  });

  // Capturar los datos del formulario
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

  // Capturar los detalles del servicio
  const pets = document.getElementById('pets').value;
  const keyReceived = document.getElementById('key').options[document.getElementById('key').selectedIndex].text;
  const preferredServiceDay = document.getElementById('serviceday').options[document.getElementById('serviceday').selectedIndex].text;
  const serviceStartDay = document.getElementById('servicestartday').value;
  const windowOfArrival = document.getElementById('windowOfArrival').options[document.getElementById('windowOfArrival').selectedIndex].text;
  const squareFootage = document.getElementById('squareFootage').value;
  const bathrooms = document.getElementById('bathrooms').value;
  const bedrooms = document.getElementById('bedrooms').value;
  const frequency = document.getElementById('frequency').value;
  const serviceFee = document.getElementById('servicefee').value;
  const tax = document.getElementById('tax').value;
  const total = document.getElementById('total').value;

  // Capturar todos los servicios seleccionados
  const serviceTypes = document.querySelectorAll('.service-type-wrapper select');
  let servicesText = '';
  serviceTypes.forEach((service, index) => {
    const serviceName = service.options[service.selectedIndex].text;
    servicesText += `${index + 1}. ${serviceName}\n`;
  });

  // Cargar la imagen base
  const img = new Image();
  img.src = 'img/inv2.png'; // Cambia la ruta si es necesario

  img.onload = function () {
    // Añadir la imagen al PDF
    doc.addImage(img, 'PNG', 0, 0, 210, 297); // Tamaño A4 en mm

    // Añadir los textos del formulario a la imagen
    doc.setFontSize(12);
    doc.text(`Customer: ${customer}`, 20, 80);
    doc.text(`Address: ${address}`, 20, 85);
    doc.text(`City: ${city}`, 20, 90);
    doc.text(`Phone: ${phone}`, 20, 95);
    doc.text(`Email: ${email}`, 20, 100);
    doc.text(`Estimate Date: ${estimateDate}`, 20, 105);
    doc.text(`Lead Source: ${leadSource}`, 120, 80);
    doc.text(`Zip: ${zip}`, 120, 85);
    doc.text(`Time: ${time}`, 120, 90);
    doc.text(`Attendant: ${attendant}`, 120, 95);
    doc.text(servicesText, 20, 140);
    doc.text(`Pets: ${pets}`, 20, 220);
    doc.text(`Key Received: ${keyReceived}`, 20, 225);
    doc.text(`Preferred Service Day: ${preferredServiceDay}`, 20, 230);
    doc.text(`Service Start Day: ${serviceStartDay}`, 20, 235);
    doc.text(`Window of Arrival: ${windowOfArrival}`, 20, 240);
    doc.text(`Square Footage: ${squareFootage}`, 20, 245);
    doc.text(`Bathrooms: ${bathrooms}`, 120, 220);
    doc.text(`Bedrooms: ${bedrooms}`, 120, 225);
    doc.text(`Frequency of Service: ${frequency}`, 120, 230);
    doc.text(`Service Fee: $${serviceFee}`, 120, 235);
    doc.text(`Tax: $${tax}`, 120, 240);
    doc.text(`$${total}`, 142, 253);

    // Guardar el PDF
    doc.save('invoice.pdf');
  }; 
});









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


function captureSection() {
  const section = document.querySelector('section.container.my-5');
  html2canvas(section).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL(); 
    link.download = 'form-capture.png'; 
    link.click();
  });
}