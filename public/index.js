$(function () {
  const db = firebase.firestore();
  const storage = firebase.storage();
  const works = [];

  function getFirestoreWorks() {
    db.collection("works")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          works.push(doc.data());
        });
        const storageRef = storage.ref();
        works.forEach((work) => {
          storageRef.child(work.img).getDownloadURL()
          .then((url) => {
            $(".swiper-wrapper").append(createSwiperImage(work, url));
          })
        })
      })
      .then( () => {
        applySwiper()
      });
    return works;
  }

  function createSwiperImage(work, imageURL) {
    return $('<div class="swiper-slide">').append(
      $('<div class="image-wrapper">').append(
        $(
          '<img class="img-fluid" alt="Responsive image">'
        ).attr("src", imageURL)
      )
    );
  }

  function displayWorkInfo(work) {
    $("#carouselInfo__title").text(work.title);
    $("#carouselInfo__author").text(work.artist);
    $("#carouselInfo__para").text(work.desc);
  }

  function applySwiper() {
    const tryDisplay = (swiper) => { setTimeout(() => {
      const slide = swiper.slides[swiper.activeIndex];
      if (typeof slide === 'undefined') {
        tryDisplay(swiper);
        return;
      }
      displayWorkInfo(works[swiper.activeIndex]);
    }, 200)};
    const swiper = new Swiper(".swiper", {
      // direction: "horizontal",
      effect: "coverflow",
      centeredSlides: true,
      slidesPerView: 2,
      init: false,
      coverflowEffect: {
        rotate: 40,
        slideShadows: true,
      },
      // loop: true,
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
      on: {
        slideChange: function () {
          const slideIndex = this.activeIndex;
          const work = works[slideIndex];
          displayWorkInfo(work);
        },
        init: function () {
          tryDisplay(this);
        }
      }
    });
    swiper.init();
  }

  function main() {
    const works = getFirestoreWorks();
  }
  main();

});
