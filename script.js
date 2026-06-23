/* =========================================================
   CV INTERACTIF — script.js
   Toutes les interactions sont en JavaScript natif (Vanilla JS)
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     1. MODE SOMBRE / CLAIR + SAUVEGARDE LOCALSTORAGE
  ======================================================= */
  const btnMode = document.getElementById("btn-mode");
  const modeIcon = btnMode.querySelector(".mode-icon");

  // Au chargement de la page, on relit le thème sauvegardé
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    modeIcon.textContent = "☾";
  }

  btnMode.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");

    // On met à jour l'icône
    modeIcon.textContent = isLight ? "☾" : "☀";

    // On sauvegarde le choix pour la prochaine visite
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });

  /* =======================================================
     2. MENU HAMBURGER (mobile)
  ======================================================= */
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  hamburger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    hamburger.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // On referme le menu automatiquement après avoir cliqué sur un lien
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  /* =======================================================
     3. NAVIGATION ACTIVE SELON LA SECTION VISIBLE AU SCROLL
     (le smooth scroll est géré en CSS via "scroll-behavior: smooth")
  ======================================================= */
  const sections = document.querySelectorAll("main section[id]");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const activeLink = document.querySelector(
            `.nav-link[href="#${entry.target.id}"]`
          );
          if (activeLink) activeLink.classList.add("active");
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => navObserver.observe(section));

  /* =======================================================
     4. APPARITION DES SECTIONS AU SCROLL (fade-in)
     + déclenchement de l'animation des barres de compétences
  ======================================================= */
  const revealTargets = document.querySelectorAll(".section, .hero");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Si la section visible contient des barres de compétences, on les anime
          const fills = entry.target.querySelectorAll(".skill-fill");
          fills.forEach((fill) => {
            const level = fill.getAttribute("data-level");
            fill.style.width = level + "%";
          });

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });

  /* =======================================================
     5. FORMULAIRE DE CONTACT — VALIDATION CÔTÉ CLIENT
  ======================================================= */
  const form = document.getElementById("contact-form");
  const champNom = document.getElementById("nom");
  const champEmail = document.getElementById("email");
  const champMessage = document.getElementById("message");
  const formSuccess = document.getElementById("form-success");

  // Expression régulière simple pour vérifier le format d'un e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function afficherErreur(champ, idErreur, message) {
    document.getElementById(idErreur).textContent = message;
    champ.closest(".form-group").classList.add("invalid");
  }

  function effacerErreur(champ, idErreur) {
    document.getElementById(idErreur).textContent = "";
    champ.closest(".form-group").classList.remove("invalid");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // on empêche l'envoi réel (pas de serveur ici)

    let formulaireValide = true;

    // Vérification du nom (ne doit pas être vide)
    if (champNom.value.trim() === "") {
      afficherErreur(champNom, "error-nom", "Le nom est obligatoire.");
      formulaireValide = false;
    } else {
      effacerErreur(champNom, "error-nom");
    }

    // Vérification de l'e-mail (non vide + format valide)
    if (champEmail.value.trim() === "") {
      afficherErreur(champEmail, "error-email", "L'e-mail est obligatoire.");
      formulaireValide = false;
    } else if (!emailRegex.test(champEmail.value.trim())) {
      afficherErreur(champEmail, "error-email", "Le format de l'e-mail est invalide.");
      formulaireValide = false;
    } else {
      effacerErreur(champEmail, "error-email");
    }

    // Vérification du message (ne doit pas être vide)
    if (champMessage.value.trim() === "") {
      afficherErreur(champMessage, "error-message-text", "Le message ne peut pas être vide.");
      formulaireValide = false;
    } else {
      effacerErreur(champMessage, "error-message-text");
    }

    // Si tout est valide, on affiche le message de succès et on vide le formulaire
    if (formulaireValide) {
      formSuccess.classList.add("visible");
      form.reset();

      // On masque le message de succès après quelques secondes
      setTimeout(() => {
        formSuccess.classList.remove("visible");
      }, 4000);
    }
  });

  /* =======================================================
     6. BOUTON RETOUR EN HAUT
  ======================================================= */
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

});
