var crsr = document.querySelector("#cursor");
var blur = document.querySelector("#cursor-blur");
const initSlider = () => {
    const imageList =document.querySelector(".slider-wrapper .image-list");
    const slideButtons =document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft =imageList.scrollWidth - imageList.clientWidth;
   // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
 // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            // Ensure the scrollbar thumb stays within bounds
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition , newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }
       // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        
    });
 // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click",()=> {
           const direction = button.id === "prev-slide" ? -1 : 1;     
           const scrollAmount = imageList.clientWidth * direction;
           imageList.scrollBy({ left:scrollAmount , behavior: "smooth" });
        });
    });
    // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display =imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display =imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }
     // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition =imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `$(thumbPosition)px`;
    }
    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
    });
}

window.addEventListener("load",initSlider);




// document.addEventListener("mousemove", function(dets){
//     crsr.style.left = dets.x+"px"
//     crsr.style.top = dets.y+"px"
//     blur.style.left = dets.x-250+"px"
//     blur.style.top = dets.y-250+"px"
// })



gsap.to("#nav",{
    backgroundColor: "#000",
    duration:0.5,
    height: "80px",
    scrollTrigger:{
        Trigger:"#nav",
        scroller: "body",
       // markers: "True",
        start:"top -10%",
        end:"top -11%",
        scrub: 2
    }
})

gsap.to("#main",{
    backgroundColor: "#000",
    scrollTrigger:{
        Trigger:"#main",
        scroller: "body",
       // markers: "True",
        start:"top -25%",
        end:"top -70%",
        scrub: 2
    }
})
