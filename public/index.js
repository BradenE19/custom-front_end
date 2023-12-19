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
        const storageRef = storage.ref();
        works.forEach((work) => {
          storageRef.child(work.img).getDownloadURL()
          .then((url) => {
            $(".swiper-wrapper").append(createSwiperImage(work, url));
          })
          console.log(work);
        })
      })
      .then( () => applySwiper());
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

  function applySwiper() {
    const tryDisplay = (swiper) => { setTimeout(() => {
      const slide = swiper.slides[swiper.activeIndex];
      if (typeof slide === 'undefined') {
        tryDisplay(swiper);
      }
      console.log(slide);
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
          console.log(this.slides[this.activeIndex]);
        },
        init: function () {
          tryDisplay(this);
        }
      }
    });
    swiper.init();
    console.log(swiper);
  }

  function main() {
    const works = getFirestoreWorks();
  }
  main();

});
