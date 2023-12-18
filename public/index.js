$(function () {
  const db = firebase.firestore();
  const storage = firebase.storage();

  async function getFirestoreWorks() {
    const works = [];
    db.collection("works")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          works.push(doc.data());
        });
        works.forEach((work) => {
          console.log(getImageFromStorage(work.img));
        })
      });
    return works;
  }

  function createSwiperImage(work) {
    return $('<div class="swiper-slide">').append(
      $('<div class="image-wrapper">').append(
        $(
          '<img class="img-fluid" alt="Responsive image" width="512" height="512">'
        ).attr("src", work.img)
      )
    );
  }

  async function getImageFromStorage(storagePath) {
    const storageRef = storage.ref();
    let imageURL = "";
    storageRef.child(storagePath).getDownloadURL()
    .then((url) => {
      imageURL = url;
      console.log(imageURL);
    })
    return imageURL;
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

  async function main() {
    const works = await getFirestoreWorks();
    // const workElements = works.map(createSwiperImage);
    const worksCopy = [...works]

    console.log(typeof works, works, worksCopy);

    // getImageFromStorage(works.img)
    //   .then((url) => {
    //     console.log(url);
    //   });

  }
  main();

  // $(".swiper-wrapper").append(workElements);
  applySwiper();
});
