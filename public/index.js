$(function () {
  const db = firebase.firestore();
  const storage = firebase.storage();

  function getFirestoreWorks() {
    const works = [];
    db.collection("works")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          works.push(doc.data());
        });
        works.forEach((work) => {
          getImageFromStorageAndAddToCarousel(work);
          console.log(work);
        })
        applySwiper();
      });
    return works;
  }

  function createSwiperImage(work, imageURL) {
    return $('<div class="swiper-slide">').append(
      $('<div class="image-wrapper">').append(
        $(
          '<img class="img-fluid" alt="Responsive image" width="512" height="512">'
        ).attr("src", imageURL)
      )
    );
  }

  function getImageFromStorageAndAddToCarousel(work) {
    const storageRef = storage.ref();
    storageRef.child(work.img).getDownloadURL()
    .then((url) => {
      $(".swiper-wrapper").append(createSwiperImage(work, url));
    })
  }

  function applySwiper(className) {
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
  }

  function main() {
    const works = getFirestoreWorks();
  }
  main();

});
