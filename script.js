// ==============================
// FUNCIONES MODAL
// ==============================
function abrirModal(modal) {
  if (typeof modal === "string") modal = document.getElementById(modal);
  modal.style.display = "flex";
  setTimeout(() => modal.style.opacity = 1, 10);
  document.body.style.overflow = "hidden";
}

function cerrarModal(modal) {
  if (typeof modal === "string") modal = document.getElementById(modal);
  if (!modal) return;
  modal.style.opacity = 0;
  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }, 300);
}

// ==============================
// SPLASH SCREEN
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const mainContent = document.getElementById("main-content");
  const btnComenzar = document.getElementById("btn-comencemos");

  btnComenzar?.addEventListener("click", () => {
    splash.style.opacity = 0;
    setTimeout(() => {
      splash.style.display = "none";
      mainContent.style.display = "block";
    }, 600);
  });

  initModalPlanes();
  initTest();
});

// ==============================
// MODAL PLANES
// ==============================
function initModalPlanes() {
  const modal = document.getElementById("modal-unificado");
  const form = document.getElementById("form-unificado");

  if (!modal || !form) return;

  const btnCerrar = modal.querySelector(".close-modal");

  document.querySelectorAll(".btn-cambio, .subscription-card button").forEach(btn => {
    btn.addEventListener("click", () => {
      const plan = btn.closest(".subscription-card")?.querySelector("h3")?.textContent || "";
      form.reset();
      document.getElementById("plan-input").value = plan;
      abrirModal(modal);
    });
  });

  btnCerrar?.addEventListener("click", () => cerrarModal(modal));

  modal.addEventListener("click", e => {
    if (!modal.querySelector(".premium-modal").contains(e.target)) cerrarModal(modal);
  });

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const btn = form.querySelector("button[type='submit']");
    btn.textContent = "Enviando...";
    btn.disabled = true;

    const data = {
      nombre: form.nombre.value,
      email: form.email.value,
      plan: form.plan.value
    };

    try {
      const res = await fetch("https://formspree.io/f/mgvzyyqk", {
        method: "POST",
        headers: { "Accept":"application/json","Content-Type":"application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error();

      alert("¡Gracias! Te contactaremos pronto");
      cerrarModal(modal);

    } catch {
      alert("Error al enviar");
      btn.disabled = false;
      btn.textContent = "Enviar y Pagar";
    }
  });
}

// ==============================
// TEST RÁPIDO
// ==============================
function initTest() {

  // Crear modal si no existe
  if (!document.getElementById("modal-test")) {
    const modal = document.createElement("div");
    modal.id = "modal-test";
    modal.className = "modal";
    modal.innerHTML = `
      <div class="premium-modal">
        <div class="test-pregunta">
          <p>¿Objetivo?</p>
          <button class="respuesta">Perder grasa</button>
          <button class="respuesta">Mantener</button>
          <button class="respuesta">Ganar músculo</button>
        </div>

        <div class="test-pregunta">
          <p>¿Entrenas?</p>
          <button class="respuesta">0-1</button>
          <button class="respuesta">2-3</button>
          <button class="respuesta">4+</button>
        </div>

        <div class="test-pregunta">
          <p>¿Tipo de plan?</p>
          <button class="respuesta">Flexible</button>
          <button class="respuesta">Estructurado</button>
        </div>

        <div class="test-final" style="display:none;"></div>
        <button class="close-modal">Cerrar</button>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const modal = document.getElementById("modal-test");
  const preguntas = modal.querySelectorAll(".test-pregunta");
  const final = modal.querySelector(".test-final");

  let paso = 0;
  let score = 0;

  function mostrar(i) {
    preguntas.forEach((p, idx) => p.style.display = idx === i ? "block" : "none");
    final.style.display = "none";
  }

  function resultado() {
    preguntas.forEach(p => p.style.display = "none");
    final.style.display = "block";

    let plan = "Mensual";
    if (score >= 5) plan = "Trimestral";
    if (score >= 10) plan = "Anual";

    final.innerHTML = `
      <p>Plan ideal: <strong>${plan}</strong></p>
      <input type="email" placeholder="Tu email">
      <button id="send-test">Recibir</button>
    `;

    document.getElementById("send-test").onclick = () => {
      const email = final.querySelector("input").value;
      if (!email) return alert("Introduce email");

      const modalPlan = document.getElementById("modal-unificado");
      modalPlan.querySelector("#plan-input").value = plan;
      modalPlan.querySelector("input[name='email']").value = email;

      cerrarModal(modal);
      abrirModal(modalPlan);
    };
  }

  modal.addEventListener("click", e => {
    if (e.target.classList.contains("respuesta")) {
      const txt = e.target.textContent;

      if (txt.includes("Perder")) score += 2;
      if (txt.includes("Ganar")) score += 4;
      if (txt.includes("Mantener")) score += 1;

      paso++;
      paso >= preguntas.length ? resultado() : mostrar(paso);
    }
  });

  modal.querySelector(".close-modal").onclick = () => cerrarModal(modal);

  document.getElementById("btn-test")?.addEventListener("click", () => {
    paso = 0;
    score = 0;
    mostrar(0);
    abrirModal(modal);
  });
}

// ==============================
// CONTADOR PLAZAS
// ==============================
function actualizarPlazas() {
  const hoy = new Date();
  const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

  const dias = Math.floor((hoy - inicioMes) / (1000 * 60 * 60 * 24));
  let plazas = Math.ceil(5 * (1 - dias / 30));
  if (plazas < 0) plazas = 0;

  const span = document.getElementById("plazas");
  if (span) span.textContent = plazas;
}

setInterval(actualizarPlazas, 3600000);
actualizarPlazas();

// ==============================
// WHATSAPP BUTTON
// ==============================
setTimeout(() => {
  const btn = document.getElementById("whatsapp-btn-ultimate");
  if (!btn) return;

  btn.classList.add("show");

}, 5000);
