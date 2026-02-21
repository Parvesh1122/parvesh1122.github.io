// ===== TEXT TO SPEECH FUNCTION =====

let voices = [];

window.speechSynthesis.onvoiceschanged = () => {
  voices = speechSynthesis.getVoices();
  console.log("Available voices:");
  voices.forEach((voice, index) => {
    console.log(index, voice.name, voice.lang);
  });
};
function speak(text, callback) {
  const speech = new SpeechSynthesisUtterance(text);
  const indianVoice = voices.find(
    (voice) =>
      voice.lang === "en-us" || voice.name.toLowerCase().includes("india"),
  );

  // ✅ Use Indian voice if found
  if (indianVoice) {
    speech.voice = indianVoice;
  }

  speech.lang = "en-us";
  speech.rate = 0.9;
  speech.pitch = 1.2;

  speech.onend = function () {
    if (callback) callback();
  };

  window.speechSynthesis.speak(speech);
}

// ===== SCROLL FUNCTION =====
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// ===== MAIN TOUR FUNCTION =====
function startTour() {
  // Stop any previous speech
  window.speechSynthesis.cancel();

  // HOME
  scrollToSection("home");
  speak(
    "Welcome to my portfolio. My name is Parvesh Kumar. I am a full stack developer who builds modern web and mobile applications.",
    function () {
      // ABOUT
      scrollToSection("about");
      speak(
        "This section tells you about me, my journey, and what I am passionate about in development.",
        function () {
          // PROJECTS
          scrollToSection("project");
          speak(
            "Here you can explore my projects where I showcase real work and practical implementations.",
            function () {
              // SKILLS
              scrollToSection("skills");
              speak(
                "These are my technical skills including frontend, backend, tools, and technologies I work with.",
                function () {
                  // SERVICES
                  scrollToSection("services");
                  speak(
                    "In this section you can see the services I provide including web development, apps, and testing.",
                    function () {
                      // CONTACT
                      scrollToSection("contact");
                      speak(
                        "If you would like to work together, feel free to contact me. Thank you for visiting my portfolio.",
                      );
                    },
                  );
                },
              );
            },
          );
        },
      );
    },
  );
}
