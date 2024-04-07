function locoScroll() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

locoScroll();



function page1animation() {
    var tl = gsap.timeline();

    tl.from(".home-wrapper .content-home h1", {
        x: -100,
        opacity: 0,
        stagger: 0.5,
        duration: .5
    });

    tl.from(".home-wrapper .content-home p", {
        x: -100,
        opacity: 0,
        stagger: 5,
        duration: .5
    })

    tl.from(".image-home", {
        x: 200,
        opacity: 0,
        stagger: 5,
        duration: .5
    })

    // Uncomment and adjust the following if you want to use ScrollTrigger
    /*
    tl.scrollTrigger({
        trigger: ".page2",
        scroller: ".main",
        start: "top 40%",
        end: "top 37%",
        // markers: true,
        scrub: 2
    });
    */

    return tl;
}

page1animation();

function out_animation() {
    var tl = gsap.timeline();
    tl.to(".home .home-wrapper .content-home, .home .home-wrapper .image-home", {
        y: -200,
        opacity: 0,
        stagger: .5,
        duration: 1,
        scrollTrigger: {
            trigger: ".app",
            scroller: ".main",
            start: "top 110%",
            end: "top 130%%",
            // markers: true,
            scrub: 2
        }
    });
    return tl;
}

out_animation();

function page2animation() {
    var tl = gsap.timeline();

    tl.from(".app .app-content, .app .app-img", {
        y: 300,
        opacity: 0,
        stagger: 0.5,
        duration: 1,
        scrollTrigger: {
            trigger: ".app",
            scroller: ".main",
            start: "top 50%",
            end: "top 77%",
            // markers: true,
            scrub: 2
        }
    });


    return tl;
};

page2animation();