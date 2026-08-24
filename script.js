// ===== Année automatique dans le footer =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Menu mobile (burger) =====
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});
// Ferme le menu après un clic sur un lien (mobile)
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

// ===== Formulaire de réservation =====
// Livraison réelle : ouverture d'un email pré-rempli vers lazeregg98@gmail.com.
// Aucune inscription requise — le visiteur confirme l'envoi depuis son client mail.
// Option automatique (sans action du visiteur) : crée un compte gratuit sur
// https://formspree.io, récupère ton endpoint (ex: https://formspree.io/f/xxxxxx)
// et colle-le dans FORMSPREE_ENDPOINT ci-dessous.
const FORMSPREE_ENDPOINT = ""; // laisse vide pour le mode mailto
const RESERVATION_EMAIL = "lazeregg98@gmail.com";
const VEHICULE_LABELS = {
  berline: "Berline électrique",
  van: "Van électrique",
  premium: "Berline premium"
};

const form = document.getElementById("booking-form");
const status = document.getElementById("form-status");

function buildBody(data) {
  return [
    "Nouvelle demande de réservation — Laya VTC",
    "------------------------------------------",
    "Nom      : " + data.name,
    "Téléphone: " + data.phone,
    "Email    : " + data.email,
    "Date/heure: " + data.date,
    "Véhicule : " + VEHICULE_LABELS[data.vehicule] || data.vehicule,
    "Détails  : " + (data.message || "(non précisé)"),
    "",
    "Envoyé depuis le site Laya VTC (Île-de-France)."
  ].join("\n");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.className = "form-status";
  status.textContent = "";

  const data = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
    date: form.date.value,
    vehicule: form.vehicule.value,
    message: form.message.value.trim()
  };

  if (!data.name || !data.phone || !data.email || !data.date) {
    status.classList.add("err");
    status.textContent = "Merci de remplir tous les champs obligatoires.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    status.classList.add("err");
    status.textContent = "Adresse email invalide.";
    return;
  }

  // Mode automatique Formspree (si endpoint renseigné)
  if (FORMSPREE_ENDPOINT) {
    status.textContent = "Envoi en cours…";
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        status.classList.add("ok");
        status.textContent = "Merci " + data.name + " ! Votre demande a bien été envoyée. Nous vous recontactons rapidement.";
        form.reset();
      } else {
        throw new Error("Formspree error");
      }
    } catch (err) {
      status.classList.add("err");
      status.textContent = "Envoi automatique indisponible. Utilisez le bouton email ci-dessous.";
    }
    return;
  }

  // Mode mailto (par défaut) — ouvre le client mail du visiteur
  const subject = encodeURIComponent("Réservation Laya VTC — " + data.name);
  const body = encodeURIComponent(buildBody(data));
  const mailto = "mailto:" + RESERVATION_EMAIL + "?subject=" + subject + "&body=" + body;
  const w = window.open(mailto, "_blank");
  if (w) {
    status.classList.add("ok");
    status.textContent =
      "Merci " + data.name + " ! Un email de réservation s'est ouvert vers " + RESERVATION_EMAIL + ". Validez l'envoi pour confirmer.";
    form.reset();
  } else {
    status.classList.add("err");
    status.textContent =
      "Impossible d'ouvrir votre messagerie. Écrivez-nous directement à " + RESERVATION_EMAIL + ".";
  }
});
