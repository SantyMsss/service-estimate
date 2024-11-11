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
  
  // Añadir las nuevas opciones
  const options = `
      <option value="" selected disabled>Option</option>
      <option value="basic-cleaning" >Basic Cleaning</option>
      <option value="full-cleaning" >Full Cleaning</option>
     
      <option value="deep-cleaning" >Deep Cleaning</option>
      <option value="move-in-cleaning" >Move In Cleaning</option> 
      <option value="move-out-cleaning" >Move Out Cleaning</option>
      <option value="post-construction" >Post Construction Cleaning</option>


      <option value="office" >Office</option>
      <option value="garage" >Garage</option>
      <option value="living-room" >Living room</option>
      <option value="kitchen" >Kitchen</option>
      <option value="entry" >Entry</option>
      <option value="hallbath" >Hallbath</option>
      <option value="bedroom" >Bedroom</option>
      <option value="bathroom" >Bathroom</option>
      <option value="laundry" >Laundry</option>
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
let creditFee = 0; // Variable global para almacenar el fee de tarjeta de crédito

function updateTotal() {
  // Obtener el subtotal ingresado por el usuario
  const subtotalInput = document.getElementById('subtotal').value;
  let subtotal = parseFloat(subtotalInput);

  // Obtener el porcentaje de descuento seleccionado
  const discountSelect = document.getElementById('discount');
  const discountPercentage = parseFloat(discountSelect.value);

  // Calcular el descuento
  const discountAmount = subtotal * (discountPercentage / 100);
  subtotal -= discountAmount; // Restar el descuento al subtotal

  // Calcular el impuesto del 7%
  const tax = subtotal * 0.075; // 7,5% de impuesto
  let grandTotal = subtotal + tax; // Total = subtotal + impuesto

  // Verificar si el método de pago es con tarjeta de crédito y agregar el 3.5% al total
  const serviceFeeSelect = document.getElementById('servicefee');
  const serviceFee = serviceFeeSelect.value;
  if (serviceFee === "credit") {
    creditFee = subtotal * 0.035; // 3.5% del subtotal
    grandTotal += creditFee; // Sumar el fee al total
  } else {
    creditFee = 0; // Resetear el fee si no es con tarjeta de crédito
  }

  // Actualizar los valores en los campos del formulario
  document.getElementById('tax').value = tax.toFixed(2); // Actualizar el impuesto
  document.getElementById('total').value = grandTotal.toFixed(2); // Actualizar el total
  document.getElementById('creditFee').value = creditFee.toFixed(2); // Mostrar el fee si es con tarjeta de crédito
}

// Evento para detectar cambios en el subtotal
document.getElementById('subtotal').addEventListener('input', updateTotal);

// Evento para detectar cambios en el porcentaje de descuento
document.getElementById('discount').addEventListener('change', updateTotal);

// Evento para detectar cambios en el método de pago
document.getElementById('servicefee').addEventListener('change', updateTotal);


// Agregar eventos a los botones
document.getElementById("addServiceButton").addEventListener("click", addServiceType);
document.getElementById("removeServiceButton").addEventListener("click", removeServiceType);

// Agregar evento al primer select existente
const firstSelect = document.querySelector('select[id="serviceType"]');
if (firstSelect) {
  firstSelect.addEventListener('change', updateTotal);
}


// Función para dividir texto en líneas de un ancho específico
function splitText(text, maxLength) {
  const lines = [];
  let currentLine = "";

  text.split(" ").forEach(word => {
    if ((currentLine + word).length > maxLength) {
      lines.push(currentLine.trim());
      currentLine = word + " ";
    } else {
      currentLine += word + " ";
    }
  });

  if (currentLine.trim().length > 0) {
    lines.push(currentLine.trim());
  }

  return lines;
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
  const comments = document.getElementById('comments').value;
  const commentsLines = splitText(comments, 70); 

  // Capturar los detalles del servicio
  const livingRoom = document.getElementById('livingRoom').value;
  const kitchen = document.getElementById('kitchen').value;
  const entry = document.getElementById('entry').value;
  const hallbath = document.getElementById('hallbath').value;
  const landry = document.getElementById('landry').value;
  const pets = document.getElementById('pets').value;
  const keyReceived = document.getElementById('key').options[document.getElementById('key').selectedIndex].text;
  const preferredServiceDay = document.getElementById('serviceday').options[document.getElementById('serviceday').selectedIndex].text;
  const serviceStartDay = document.getElementById('servicestartday').value;
  const windowOfArrival = document.getElementById('windowOfArrival').options[document.getElementById('windowOfArrival').selectedIndex].text;
  const squareFootage = document.getElementById('squareFootage').value;
  const bathrooms = document.getElementById('bathrooms').value;
  const bedrooms = document.getElementById('bedrooms').value;
  const frequency = document.getElementById('frequency').value;

  // Capturar el subtotal, tax y total
  const subtotal = document.getElementById('subtotal').value;
  const tax = document.getElementById('tax').value;
  const total = document.getElementById('total').value;

  // Capturar el porcentaje de descuento seleccionado
  const discountSelect = document.getElementById('discount');
  const discountPercentage = parseFloat(discountSelect.value);


  const discountAmount = subtotal * (discountPercentage / 100);

   // Capturar todos los servicios seleccionados
   const serviceTypes = document.querySelectorAll('.service-type-wrapper select');
   let servicesText = '';
   serviceTypes.forEach((service, index) => {

     const serviceName = service.options[service.selectedIndex].text;
     servicesText += `${index + 1}. ${serviceName}\n`;
     
   });


   // Verificar el método de pago y calcular el fee si es con tarjeta de crédito
  const serviceFeeSelect = document.getElementById('servicefee');
  const serviceFee = serviceFeeSelect.value;
  let serviceFeeAmount = 0;
  if (serviceFee === "credit") {
    serviceFeeAmount = (parseFloat(subtotal)) * 0.035; // 3.5% del subtotal 
  }

  // Generar los textos del PDF
  const serviceFeeText = serviceFee === "credit" ? `3.5% fee` : `Cash`;
  const serviceFeeAmountText = creditFee.toFixed(2); // Usar el valor calculado del service fee
  


  // Cargar la imagen base
  const img = new Image();
  img.src = 'img/inv4.png'; // Cambia la ruta si es necesario

  img.onload = function () {
    // Añadir la imagen al PDF
    doc.addImage(img, 'PNG', 0, 0, 210, 297); // Tamaño A4 en mm

    // Añadir los textos del formulario a la imagen
    doc.setFontSize(12);
    doc.text(`Customer: ${customer}`, 20, 80);
    doc.text(`Address: ${address}`, 20, 85);
    doc.text(`City: ${city}`, 20, 90);
    doc.text(`Zip: ${zip}`, 20, 95);
    doc.text(`Phone: ${phone}`, 20, 100);
    doc.text(`Email: ${email}`, 20, 105);
    doc.text(`Estimate Date: ${estimateDate}`, 120, 80);
    doc.text(`Lead Source: ${leadSource}`, 120, 85);
    doc.text(`Time: ${time}`, 120, 90);
    doc.text(`Attendant: ${attendant}`, 120, 95);
    

    // Añadir los detalles del servicio
    doc.text(`Living Room: ${livingRoom}`, 20, 140);
    doc.text(`Kitchen: ${kitchen}`, 20, 145);
    doc.text(`Entry: ${entry}`, 20, 150);
    doc.text(`Hallbath: ${hallbath}`, 20, 155);
    doc.text(`Landry: ${landry}`, 20, 160);
    doc.text(`Pets: ${pets}`, 20, 165);
    doc.text(`Key Received: ${keyReceived}`, 20, 170);
    doc.text(`Preferred Service Day: ${preferredServiceDay}`, 20, 175);
    doc.text(`Service Start Day: ${serviceStartDay}`, 20, 180);
    doc.text(`Window of Arrival: ${windowOfArrival}`, 20, 185);

    doc.text(servicesText, 20, 220); // Añadir los servicios seleccionados

    // Añadir los textos relacionados con los valores adicionales
    doc.text(`Square Footage: ${squareFootage}`, 120, 140);
    doc.text(`Bathrooms: ${bathrooms}`, 120, 145);
    doc.text(`Bedrooms: ${bedrooms}`, 120, 150);
    doc.text(`Frequency of Service: ${frequency}`, 120, 155);
   
    doc.text(`Discount (${discountPercentage}%): -$${discountAmount.toFixed(2)}`, 120, 225); // Mostrar el descuento
    doc.text(`Subtotal: $${subtotal}`, 120, 220);
    doc.text(`Tax: $${tax}`, 120, 235);
    doc.text(`Service Fee (${serviceFeeText}): $${serviceFeeAmountText}`, 120, 240); // Mostrar el 3.5% si aplica
    doc.text(`$${total}`, 142, 253);
    doc.text(`Additional Comments:`, 20, 255);
    doc.setFontSize(11);
    const commentsLines = doc.splitTextToSize(comments, 170); // Ajusta el ancho según sea necesario
    doc.text(commentsLines, 20, 262);

    // Guardar el PDF
    doc.save(`estimate_${customer}_${estimateDate}.pdf`);
  };
});


// Función para dividir el texto de comentarios en líneas de un tamaño especificado
function formatText(text, maxLineLength) {
  const words = text.split(' ');
  let lines = [];
  let currentLine = '';

  words.forEach(word => {
    if ((currentLine + word).length > maxLineLength) {
      lines.push(currentLine);
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  });

  if (currentLine) lines.push(currentLine); // Añadir la última línea

  return lines.join('\n'); // Unir las líneas con saltos de línea
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


function captureSection() {
  const section = document.querySelector('section.container.my-5');
  html2canvas(section).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL(); 
    link.download = 'form-capture.png'; 
    link.click();
  });
}