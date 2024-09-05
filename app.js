document.addEventListener("DOMContentLoaded", () => {
  fetch("/prosjekter")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#prosjekt-list tbody");
      data.prosjekter.forEach((prosjekt) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${prosjekt.id}</td>
                    <td>${prosjekt.navn}</td>
                    <td>${prosjekt.beskrivelse}</td>
                    <td>${prosjekt.status}</td>
                `;
        tableBody.appendChild(row);
      });
    });

  document
    .getElementById("opprett-prosjekt-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const navn = document.getElementById("navn").value;
      const beskrivelse = document.getElementById("beskrivelse").value;
      const status = document.getElementById("status").value;

      const prosjekt = {
        navn,
        beskrivelse,
        status,
      };

      fetch("/opprett-prosjekt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prosjekt),
      })
        .then((response) => response.json())
        .then(() => {
          alert("Prosjekt opprettet!");
          document.getElementById("opprett-prosjekt-form").reset();
          updateProsjektList();
        });
    });

  function updateProsjektList() {
    fetch("/prosjekter")
      .then((response) => response.json())
      .then((data) => {
        const tableBody = document.querySelector("#prosjekt-list tbody");
        tableBody.innerHTML = "";
        data.prosjekter.forEach((prosjekt) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                        <td>${prosjekt.id}</td>
                        <td>${prosjekt.navn}</td>
                        <td>${prosjekt.beskrivelse}</td>
                        <td>${prosjekt.status}</td>
                    `;
          tableBody.appendChild(row);
        });
      });
  }
});
