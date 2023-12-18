$( function () {
  const db = firebase.firestore();

  // Gets all works from firestore as an array of objects
  function getFirestoreWorks() {
    const works = [];
    db.collection("works").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        works.push(doc.data());
      });
      console.log(works);
    })
    return works;
  }
  getFirestoreWorks();
  const swiper = new Swiper(".swiper", {
    // direction: "horizontal",
    effect: "coverflow",
    centeredSlides: true,
    slidesPerView: 2,
    coverflowEffect: {
      rotate: 40,
      slideShadows: true,
    },
    loop: true,
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
  console.log(swiper);
})