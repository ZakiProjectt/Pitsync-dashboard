(function () {
  "use strict";
  var UNIT_DATA = {
    hm400: {
      unitId: "DT-109",
      model: "Komatsu HM400",
      operator: "Fauzan .Z",
      location: "Hauling Roads",
      speedFuel: "25 km/h &nbsp;|&nbsp; 85%",
      status: "Active - Loading",
      statusColor: "green", 
      truckImg: "assets/truck.png", // image truvk
      operatorPhoto: "assets/operator.png", //image driver
      operatorCaption: "Fauzan .Z | 24th"
    }
  };

  var detailCard        = document.getElementById("detailCard");
  var closeBtn           = document.getElementById("closeDetailCard");
  var detailUnitId       = document.getElementById("detailUnitId");
  var detailModelName    = document.getElementById("detailModelName");
  var detailOperator     = document.getElementById("detailOperator");
  var detailLocation     = document.getElementById("detailLocation");
  var detailSpeedFuel    = document.getElementById("detailSpeedFuel");
  var detailStatus       = document.getElementById("detailStatus");
  var detailStatusDot    = detailStatus ? detailStatus.previousElementSibling : null;
  var detailTruckImage   = document.getElementById("detailTruckImage");
  var detailOperatorPhoto    = document.getElementById("detailOperatorPhoto");
  var detailOperatorCaption  = document.getElementById("detailOperatorCaption");

  var selectableTriggers = document.querySelectorAll(
    ".map-pin--selectable, .fleet-table__row--selectable"
  );

  var currentUnit = null;

  function fillDetailCard(unitKey) {
    var data = UNIT_DATA[unitKey];
    if (!data) return;

    detailUnitId.textContent = data.unitId;
    detailModelName.textContent = data.model;
    detailOperator.textContent = data.operator;
    detailLocation.textContent = data.location;
    detailSpeedFuel.innerHTML = data.speedFuel;
    detailStatus.textContent = data.status;
    detailTruckImage.src = data.truckImg;
    detailTruckImage.alt = data.model;
    detailOperatorPhoto.src = data.operatorPhoto;
    detailOperatorCaption.textContent = data.operatorCaption;

    if (detailStatusDot) {
      detailStatusDot.className = "status-dot status-dot--" + data.statusColor;
    }
  }

  function highlightSelected(unitKey) {
    selectableTriggers.forEach(function (el) {
      el.classList.toggle("is-selected", el.dataset.unit === unitKey);
    });
  }

  function openDetailCard(unitKey) {
    fillDetailCard(unitKey);
    
    // Tampilkan card secara eksplisit
    detailCard.hidden = false;
    detailCard.style.display = ""; // ATAU "flex" (sesuaikan dengan layout CSS kamu)
    detailCard.classList.add("is-active");

    highlightSelected(unitKey);
    currentUnit = unitKey;

    // Pakai setTimeout tipis biar browser selesai render baru scroll
    setTimeout(function () {
      detailCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  }

  function closeDetailCard() {
    detailCard.hidden = true;
    detailCard.style.display = "none";
    detailCard.classList.remove("is-active");

    highlightSelected(null);
    currentUnit = null;
  }

  selectableTriggers.forEach(function (el) {
    el.addEventListener("click", function () {
      var unitKey = el.dataset.unit;
      if (!unitKey) return;

      if (currentUnit === unitKey) {
        closeDetailCard();
      } else {
        openDetailCard(unitKey);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeDetailCard);
  }
})();