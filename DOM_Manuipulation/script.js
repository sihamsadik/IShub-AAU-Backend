// Create form element
const form = document.createElement("form");

// Create fieldset (the box)
const fieldset = document.createElement("fieldset");
form.appendChild(fieldset);

// Create legend (the title at the top of the box)
const legend = document.createElement("legend");
legend.textContent = "Employee Details";
fieldset.appendChild(legend);

// First Name
fieldset.appendChild(createRow("First name:", "text"));

// Last Name
fieldset.appendChild(createRow("Last name:", "text"));

// Gender
const genderLabel = document.createElement("label");
genderLabel.textContent = "Gender: ";
fieldset.appendChild(genderLabel);

fieldset.appendChild(createRadio("gender", "Male"));
fieldset.appendChild(createRadio("gender", "Female"));
fieldset.appendChild(document.createElement("br"));

// Employee ID
fieldset.appendChild(createRow("Employee ID:", "text"));

// Designation
fieldset.appendChild(createRow("Designation:", "text"));

// Phone Number
fieldset.appendChild(createRow("Phone Number:", "text"));

// Submit button
const submit = document.createElement("button");
submit.textContent = "Submit";
submit.type = "submit";
fieldset.appendChild(document.createElement("br"));
fieldset.appendChild(submit);

// Append form to body
document.body.appendChild(form);

// Helper functions
function createRow(labelText, inputType) {
  const container = document.createElement("div");

  const label = document.createElement("label");
  label.textContent = labelText;
  label.style.display = "inline-block";
  label.style.width = "120px";

  const input = document.createElement("input");
  input.type = inputType;

  container.appendChild(label);
  container.appendChild(input);
  container.appendChild(document.createElement("br"));

  return container;
}

function createRadio(name, value) {
  const label = document.createElement("label");
  const input = document.createElement("input");

  input.type = "radio";
  input.name = name;
  input.value = value;

  label.appendChild(input);
  label.append(` ${value} `);

  return label;
}
