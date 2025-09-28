/* 1. BacktoTop - Done */
function backToTop() {
  const header = document.querySelector(".header");
  const backToTop = document.querySelector(".backtotop");

  function scrollBackToTop() {
    let headerHeight = header.clientHeight;
    let scrollY = window.scrollY;

    if (scrollY > headerHeight) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  }

  window.addEventListener('scroll', scrollBackToTop);

  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
backToTop();

// Normal way - backToTop.addEventListener ()
// const backToTop = document.querySelector('.backtotop').addEventListener
// ('click', () =>{ window.scrollTo({ top: 0, behavior: 'smooth' });
// })

/* 2. Move to Bottom*/
const mouseToBottom = document.querySelectorAll('.schero__bottom-icons');
mouseToBottom.forEach(function(icon) {
  icon.addEventListener('click', () => {
    window.scrollTo({
      // scrollHeight does not use for window, document.documentElement.scrollHeight is the height of the document from the top to the bottom
      top: document.documentElement.scrollHeight, 
      behavior: 'smooth'
    });
  });
});

/* 3. Menu Change Color */
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header'),
  heroSection = document.querySelector('.schero'),
  heroOffsetHeight = heroSection.offsetHeight,
  backToTop = this.document.querySelector('.backtotop'),
  scrollLocation = window.scrollY;

  if (scrollLocation >= heroOffsetHeight) {
    header.classList.add('--active');
    backToTop.classList.add('--active')

  } else {
    header.classList.remove('--active');
    backToTop.classList.remove('--active')
  }
})

/* 4. Hamburger Mobile - Done but Rewrite */ 
const hamburgerMobileHandle = () =>{
    const hamburgerBtn = document.querySelector('.header__cta-hamburger'),
    navWindow = document.querySelector('.menumobile')
    hamburgerBtn.addEventListener('click', function() {
        this.classList.toggle('--active');
        navWindow.classList.toggle('--active');
    })
    //Hide Bar 
    function hideBar() {
        hamburgerBtn.classList.remove('--active');
        navWindow.classList.remove('--active')
    }

    // resize Window
    window.addEventListener('resize', ()=>{
        let viewWindow = window.innerWidth;
        if (viewWindow > 992){
        hideBar()
    }
    })
}
hamburgerMobileHandle();

/* 5. progressBar - Done */
const progressBar = () => {
  let progress = document.querySelector('.progressbar');

//this replaces for Window (global object)
  this.addEventListener('scroll', () => {
    //get the scrolling distance
    let scrollY = this.scrollY;
    /*
    _ offSetHeight alone gives the total height of an element, including its content, padding, border, and any vertical scrollbar.
    It does not measure the height of pseudo element (before / after). Same with offsetWidth.
    _ To get the whole height of entire layout - use document.body.offsetHeight 
    _ innerHeight is the visible area you see for the webpage, deduct innerHeight so scrollY can get the maximum height
    */
    let percent = ((scrollY * 100) /(document.body.offsetHeight - this.innerHeight));
    // console.log(percent)
    /*
    _ element.style.property = value; => This syntax allows you to set a specific CSS property of the `element` to a new `value`
    _ The style property in Js allows you to access and manipulate the inline CSS styles of an HTML element. 
    It is a way to directly interact with the CSS properties of an element
    */
    progress.style.width = `${percent}%`;
  });
};
// progressBar();
    /* load before run function in case for slow 3G the Internet does not load all the pictures yet, it will make the wrong measurement, make sure to load first*/
this.addEventListener('load', () => {
  progressBar();
});

/*Practice console scrollY */
// function getScrollY (){
//     let scroll = window.scrollY;
//     console.log(scroll)
// }
// getScrollY();

/* 6. Scroll to Section - Done */ 
function scrollToSection () {
const menuSection = document.querySelectorAll('header .header__menu li a'),
heightHeader = document.querySelector('header').offsetHeight;
menuSection.forEach(function(item, index){
    item.addEventListener('click', function(e){
        e.preventDefault()
        const attributeHref = item.getAttribute('href');
        
        
        // console.log(attributeHref) // testing
        // const idSection = attributeHref.replace('#', '')
        window.scrollTo({
            top: document.querySelector(attributeHref).offsetTop - heightHeader,
            behavior: "smooth",
        })
        removeActiveMenu()
        item.classList.add('active')
    })
})

function removeActiveMenu(){
    menuSection.forEach(function (menu){
    menu.classList.remove('active');
});
}

/*  Active Menu Scrolling */
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', function(){
    let scrollY = window.scrollY
    sections.forEach(function(section, index){
      // Check if we are at the current section
        if (scrollY > section.offsetTop - heightHeader && 
            scrollY < section.offsetTop + section.offsetHeight){
            // Make sure the head__menu li is empty first 
            removeActiveMenu()
            //Reason to have to seperate adding menuSection, cause with this only, when you first scroll it will start with ScrollY
            // if we erase this it not work, cause it needs to have a default active class ading into first
            menuSection[index].classList.add('active')
            //Thats why we initiate with scrolling to start from home
            sections.addEventListener('scroll', ()=>{
            // menuSection[0].classList.add('active')
            menuSection[index].classList.add('active')
          })
        }
    })
})
}
scrollToSection()

/*7 Mobile Scroll to Section */
function mobileScrollToSection (){
  const mobileItem = document.querySelectorAll('.menumobile .header__menu li a'),
  menumobile = document.querySelector('.menumobile'),
  hamburgerCloseBtn = document.querySelector('.header__cta-hamburger')

  mobileItem.forEach(function(item){
    item.addEventListener('click', ()=>{
       menumobile.classList.remove('--active');
       hamburgerCloseBtn.classList.remove('--active')
    })
  })
}
mobileScrollToSection()

/* 8. Tabs - Done */
function handleTabNews() {
  let tabs = document.querySelectorAll('.scnews__info-item'),
      listNews = document.querySelectorAll('.scnews__list')

  tabs.forEach(function(tab, index) {
    tab.addEventListener('click', function() {
      // Remove 'active' class from all tabs
      tabs.forEach(function(tab) {
        tab.classList.remove('--active');
      });

      // Add 'active' class to the clicked tab
      this.classList.add('--active');

      // Hide all news lists
      listNews.forEach(function(newsList) {
        newsList.classList.remove('--active');
      });

      // Add 'active' class to the corresponding news list
      listNews[index].classList.add('--active');
    });
  });
}

handleTabNews();

/* 9. Accordion - done */
let acc = document.querySelectorAll(".accordion"),
    panels = document.querySelectorAll(".panel"),
    plusIcons = document.querySelectorAll('.plus-icon'),
    activeIndex = null;

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    if (activeIndex !== null && activeIndex !== i) {
      // Close the previously opened accordion
      acc[activeIndex].classList.remove("active");
      panels[activeIndex].style.display = "none";
      plusIcons[activeIndex].classList.remove("--active");
    }

    if (activeIndex === i && acc[activeIndex].classList.contains("active")) {
      // Toggle the clicked accordion closed
      acc[activeIndex].classList.remove("active");
      panels[activeIndex].style.display = "none";
      plusIcons[activeIndex].classList.remove("--active");
      activeIndex = null;
    } else {
      // Open the clicked accordion
      acc[i].classList.add("active");
      panels[i].style.display = "block";
      plusIcons[i].classList.add("--active");
      activeIndex = i;
    }
  });
}

/* 10. Modal Video - done */
function handleModalVideo(){
  let videos = document.querySelectorAll('.scvideo .container .videos__list-item .thumb__picture'),
  btnvideo = document.querySelector('.btnvideo'),
  modalVideo = document.querySelector('.popupvideo'),
  iframeModalVideo = document.querySelector('.popupvideo .popupvideo__inner .popupvideo__inner-frame iframe'),
  btnClose = document.querySelector('.popupvideo .popupvideo__inner .close__btn')


    videos.forEach(function (video){
    video.addEventListener('click', function(){
    //Show Modal
    modalVideo.classList.add('--active')

    //Get Data Id
    let dataID = video.getAttribute('data-video-src');
    // console.log(dataId)

    // //Set Id Iframe
    iframeModalVideo.setAttribute('src', `https://www.youtube.com/embed/${dataID}?mute=1&autoplay=1`) // template string
    // iframeModalVideo.setAttribute('src', `https//www.youtube.com/embed'+ dataId +'?autoplay=1`) // normal way of connecting string
  })
})// autoplay=1&mute=1 does not work, reverse - mute=1&autoplay=1 work for autoplay, must mute first then can autoplay !
    

    function closeModal(){
      //Hide modal
      modalVideo.classList.remove('--active')
      //Empty entire iframe without sound
      iframeModalVideo.setAttribute('src', '')
    }

    //Close Modal
    btnClose.addEventListener('click', function(){
      closeModal()
    })
    //Close when clicking outside background
    modalVideo.addEventListener('click', function(){
      closeModal()
    })

}
handleModalVideo()

function handleBannerVideo() {
  let btnVideo = document.querySelector('.scbanner .btnvideo'),
    modalVideo = document.querySelector('.popupvideo'),
    iframeModalVideo = document.querySelector('.popupvideo .popupvideo__inner .popupvideo__inner-frame iframe'),
    btnClose = document.querySelector('.popupvideo .popupvideo__inner .close__btn');

  btnVideo.addEventListener('click', function () {
    // Show Modal
    modalVideo.classList.add('--active');

    // Get Data Id
    let dataId = btnVideo.getAttribute('data-video-src');
    console.log(dataId);

    // Set Id Iframe
    iframeModalVideo.setAttribute('src', `https://www.youtube.com/embed/${dataId}?mute=1&autoplay=1`);
  });

  function closeModal() {
    // Hide modal
    modalVideo.classList.remove('--active');
    // Empty entire iframe without sound
    iframeModalVideo.setAttribute('src', '');
  }

  // Close Modal
  btnClose.addEventListener('click', function () {
    closeModal();
  });

  // Close when clicking outside background
  modalVideo.addEventListener('click', function () {
    closeModal();
  });
}
handleBannerVideo();

/* 11. isLoading - done*/
// function initLoading(){
//   let loadedCount = 0,
//   imgs = document.querySelectorAll('img').length,
//   container = document.querySelector('body')

//   let imgLoaded = imagesLoaded(container);

//   imgLoaded.on('progress', (instance) => {
//     loadedCount++;
//     percent = Math.floor((loadedCount / imgs) * 100);
//     handleLoading(percent)
//   }).on('always', (instance) => {
//     console.log('always');
//   }).on('fail', (instance) => {
//     console.log('fail');
// }).on('done', (instance) => {
//     console.log('done');
//     hideLoading()
// })
// }

// function handleLoading(percent){
//   const progress = document.querySelector('.loading__inner-progress'),
//   textPerCent = document.querySelector('.loading__percent');
//   progress.style.width = `${percent}%`
//   textPerCent.innerHTML = `${percent}%`
// }

// function hideLoading(){
//   const loading = document.querySelector('.loading');
//   body = document.querySelector('body');
//   loading.classList.add('--is-loaded')
//   body.classList.remove('--disable-scroll')
// }
// initLoading()

/* Second way with setTimeout */
function handleLoading(percent) {
  const progress = document.querySelector('.loading__inner-progress');
  const textPerCent = document.querySelector('.loading__percent');
  progress.style.width = `${percent}%`;
  textPerCent.innerHTML = `${percent}%`;
}

function hideLoading() {
  const loading = document.querySelector('.loading');
  const body = document.querySelector('body');
  loading.classList.add('--is-loaded');
  body.classList.remove('--disable-scroll');
}

function showPage() {
  const page = document.querySelector('.page');
  page.style.display = 'block';
}

function initLoading() {
  // Show loading animation
  handleLoading(0);

  // Simulate loading progress
  const loadingTime = 2000; // 2 seconds
  const increment = 100 / (loadingTime / 100);
  let percent = 0;
  const interval = setInterval(() => {
    percent += increment;
    handleLoading(percent);
    if (percent >= 100) {
      clearInterval(interval);
      hideLoading();
      setTimeout(showPage, 1000); 
    }
  }, 100);
}

// Call initLoading function to start the loading animation
initLoading();

/* 12. Change Language - done*/
const languageDropdown = document.querySelector('.header__cta-language');
const languageText = document.querySelector('.language-text');
const dropdownItems = document.querySelectorAll('.dropdown li');

// Function to handle showing the selected language
function showSelectedLanguage(language) {
  languageText.textContent = language;
}

//13 Function to toggle the dropdown language
function toggleDropdown() {
  languageDropdown.classList.toggle('--active');
}

// Add click event listener to the language dropdown
languageDropdown.addEventListener('click', () => {
  toggleDropdown();
});

// Add click event listener to each dropdown item
dropdownItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    const selectedLanguage = event.target.textContent;
    showSelectedLanguage(selectedLanguage);
    toggleDropdown();
  });
});

/* 14. Show and Hide Eye Icon */
function seePassword() {
  const eyeIconOpen = document.querySelector('.eye-icon'),
  eyeIconClose = document.querySelector('.eye-icon.--close'),
  passwordInput = document.querySelector('#password');

    // Password Display
    eyeIconOpen.addEventListener('click',()=>{
      if (passwordInput.type = "password"){
        passwordInput.type = "text";
        eyeIconOpen.style.display = "none";
        eyeIconClose.style.display = "block";
      }
    })
    eyeIconClose.addEventListener('click',() => {
      if( passwordInput.type = "text"){
        passwordInput.type = "password";
        eyeIconOpen.style.display = "block";
        eyeIconClose.style.display = "none";
      }})
  }
seePassword()

  function seeConfirmPassword(){
    const eyeIconOpen = document.querySelector('.eye-icon.--confirm'),
    eyeIconClose = document.querySelector('.eye-icon.--close.--confirm.--close'),
    confirmPasswordInput = document.querySelector('#confirmpassword')
  // Confirm password Display
    eyeIconOpen.addEventListener('click',()=>{
      if (confirmPasswordInput.type = "password"){
        confirmPasswordInput.type = "text";
        eyeIconOpen.style.display = "none";
        eyeIconClose.style.display = "block";
      }
    })
    eyeIconClose.addEventListener('click',() => {
      if( confirmPasswordInput.type = "text"){
        confirmPasswordInput.type = "password";
        eyeIconOpen.style.display = "block";
        eyeIconClose.style.display = "none";
      }})
  }
  seeConfirmPassword()
//Check more for using adding class --close and simplify the code above 
   

/*15 Slider Hero */
function handleSliderHero(){
//Create Slider
var slider = document.querySelector('.schero__slider');
var flktySlider = new Flickity( slider, {
  // options
  fade: true,
  cellAlign: 'left',
  contain: true,
  draggable:'>1',
  imagesLoaded: true ,
  lazyLoad:true,
  prevNextButtons: false,
  wrapAround: true,
  pageDots: true,
  autoPlay: 3000,
  pauseAutoPlayOnHover: false,

   on: {
    ready: function() {
      console.log('Flickity is ready');
      handleDotsSlider();
    },
    change: function( index ) {
      console.log( 'Slide changed to' + index );
      handlePageSlider(index)
    }
  }
});

/* Sliding for Gallery */
function displayGallery () {
	Fancybox.bind('[data-fancybox ="images"]'),
	{
		// Your custom options
		infinite: false,
		keyboard: {
			Escape: "close",
			Delete: "close",
			Backspace: "close",
			PageUp: "next",
			PageDown: "prev",
			ArrowUp: "prev",
			ArrowDown: "next",
			ArrowRight: "next",
			ArrowLeft: "prev",
		},
		on: {
			ready: (fancybox) => {
				console.log(fancybox);
			},
		},
	};
};
displayGallery()

/* Controls - Section Hero - Button Pre and Next  */

let btnPrev = document.querySelector('.controls__button.--buttonprev'),
btnNext = document.querySelector('.controls__button.--buttonnext');

btnPrev.addEventListener('click', function(){
  flktySlider.previous(true)
})

btnNext.addEventListener('click', function(){
  flktySlider.next(true)
})

/* Sliding Dots*/
function handleDotsSlider(){
  let dotsSlider = document.querySelector('.flickity-page-dots'),
  dotsSliderBottom = document.querySelector('.schero__bottom-page');
  dotsSliderBottom.appendChild(dotsSlider)
}

function handlePageSlider(index) {
  let numberCurrent = document.querySelector('.schero__bottom-page .number__current');
  numberCurrent.innerHTML = (index + 1).toString().padStart(2, '0');
}
}

/*16 Slider Carousel */
function handleSliderCarousel(){
//Create Slider
var slider = document.querySelector('.sccarousel__img');
var flktySlider = new Flickity( 
  slider, 
  {
  // options
  cellAlign: 'left',
  contain: true,
  draggable:'>1',
  prevNextButtons: false,
  wrapAround: true,
  pageDots: false,
  freeScroll: true,
  autoPlay: 1000,
});
    flktySlider.on('scroll', function (progress) {
    var progressBar = document.querySelector('.sccarousel__slide-bar');
    progressBar.style.width = progress * 100 + '%';
  });
}

/* Make sure to load the browser first for slide functions */
window.addEventListener('load', ()=>{
handleSliderCarousel(),
handleSliderHero()
})

/*17  Sign Up Popup Validate Form */
const signupPopup = () => {
  const signup = document.querySelector('.signup'),
  signupBtn = document.querySelector('.header__cta-signup'),
  closeSignupBtn = document.querySelector('.signup__inner-close'),
  signupInner = document.querySelector('.signup__inner'),
  signupMobileBtn = document.querySelector('.menumobile .header__menu .buttonyellow'),
  form = document.querySelector('.form');

  function addSignup() {
    signup.classList.add('--active');
  }

  function closeSignup(){
    signup.classList.remove('--active');
  }  

  signupBtn.addEventListener('click', () => {
    addSignup();
  });

  signupMobileBtn.addEventListener('click',()=>{
    addSignup();
  })
  closeSignupBtn.addEventListener('click', () => {
    closeSignup();
  });
  
  signup.addEventListener('click', (e) =>{
    closeSignup()
    e.stopPropagation()
    })

  signupInner.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  }
signupPopup();

/* 18. Validate Form */
function validateForm(){
  const form = document.querySelector('.form'),
  fullname = document.querySelector('#fullname'),
  email = document.querySelector('#email'),
  username = document.querySelector('#username'),
  password = document.querySelector('#password'),
  confirmPassword = document.querySelector('#confirmpassword'),
  confirm = document.querySelector('#confirm')

// Get to Parent
function getParentInput(element, selector){
  /*Confirm has different parent, which is form__group-check, so cannot use 
  handleError for confirm, so must run this function to assign the correct parent
  */
  while (element.parentElement){
    if(element.parentElement.matches(selector)){
      return element.parentElement
    }
    // console.log(element);
    element = element.parentElement
  }
}

//Handle Error
function handleError(input, textError = ''){
  const parentInput = getParentInput(input, '.form__group');
  // let error = input.parentElement.querySelector('.error');
  let error = parentInput.querySelector('.error');// same with input.parentElement
  //Display Error
  if (textError != ''){
    error.innerText = textError
    input.classList.add('--input-error')
  } else {
  //Erase error
  error.innerText = textError
  input.classList.remove('--input-error')
  }
}

// Vallidate username
function checkUsername(value){
    // Set up username format - Username does not have s[ace and special symbols
  const regUsername = /^[a-z0-9_.]+$/ // find on Gg - any symbols you want
  return regUsername.test(value) //Testing is the value is as regUsername - Boolean return - true / false
}

//Vallidate password
function checkPassword(value){
    // Set up password format - needs to contain these symbols 
  const regPassword = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/ // find on Gg (Stackoverflow)- any symbols you want
  return regPassword.test(value) 
}

// Vallidate email
function checkEmail(value){
  const regEmail = /\S+@\S+\.\S+/;
  return regEmail.test(value) 
}


function checkInputs(){
  let arrayData = []
  //Fullname
  const valueFullname = fullname.value.trim()
  // console.log(valueFullname) - testing 

  if (valueFullname == ''){
    //Display error
    handleError(fullname, "Please add your fullname")
    return false
  } else {
  //Erase error
    arrayData.push(valueFullname)
    handleError(fullname)
  }

  //Username
  const valueUsername = username.value.trim()

  if (valueUsername == ''){
    handleError(username, "Please add your username")
    return false
  } else if(!checkUsername(valueUsername)){
    handleError(username, 'Username does not have space and special symbols')
    return false
  } else {
    arrayData.push(valueUsername)
    handleError(username)
  }


  //Password
  const valuePassword = password.value.trim()

  if (valuePassword == ''){
    handleError(password, "Please add your password")
    return false
  } else if(!checkPassword(valuePassword)){
    handleError(password, 'Password must have number, special symbols and at least 6 characters ')
    return false
  } else {
    arrayData.push(valuePassword)
    handleError(password)
  }

//Confirm Password
  const valueConfirmPassword = confirmPassword.value.trim()

  if (valueConfirmPassword == ''){
    handleError(confirmPassword, "Please add your confirm password")
    return false
  } else if(valuePassword != valueConfirmPassword){
    handleError(confirmPassword, 'Password is not the same')
    return false
  } else {
    arrayData.push(valueConfirmPassword)
    handleError(confirmPassword)
  }

  //Email
  const valueEmail = email.value.trim()

  if (valueEmail == ''){
    handleError(email, "Please add your email")
    return false
  } else if(!checkEmail(valueEmail)){
    handleError(email, 'Email is not identified')
    return false
  } else {
    arrayData.push(valueEmail)
    handleError(email)
  }// check

//Confirm
// If users do not tick checked. Checked does not need arrayData.push , it processes for submit
  if (!confirm.checked){
    handleError(confirm, "Please confirm")
    return false
  }  else {
    handleError(confirm)
  }

  return arrayData
} 

//Submit form
form.addEventListener('submit', function (e){
  e.preventDefault()// prevent for open in new tab
  const data = checkInputs();
  // console.log(data) 
  // Or we can write if(result != false) instead data.length > 0 - this for sure for Data Validation, cause its checked at the handleError step
  // Or if(result) {} - this possible too, cause as above its been validated. Other method to have input written correct - find out more onChange (like auto-correct), onBlur
  if(data.length > 0){
    // 1. Call Api, Post Data
    console.log('Wonderful')
    // 2. Send Data to Server
    // 3. If sending data successful, inform users successful message
    // 4. If fail sending data, inform to user with Error Server/ Lost Internet / Error Api...
  } else {
    console.log('ERROR') // If error, next step can be reset input, this is the second step to ensure, as long as it passes checkInput so its good 
  }
})
}
validateForm()

