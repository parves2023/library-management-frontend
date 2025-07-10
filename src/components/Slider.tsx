import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import Typewriter from "typewriter-effect";

const images = [
  {
    src: "https://www.firstworldpublications.com/wp-content/uploads/2019/11/Fwp-banner-new.jpg",
    heading: "Discover Endless Stories",
    subheading: "Welcome to the People's Library",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6UIkcMhgPFh0lyaRjiaZFNPXCNqMg7s_cv-NpLOxEEGF7YK_qhDuNDKpHMb-UBQr_n6A&usqp=CAU",
    heading: "Read. Learn. Grow.",
    subheading: "From classics to the latest arrivals",
  },
  {
    src: "https://www.slideegg.com/image/catalog/703268-ppt-templates-book.png",
    heading: "Be a Part of the Story",
    subheading: "Borrow, Share & Inspire",
  },
];

export default function Slider() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
    },
  });

  const navigate = useNavigate();

  return (
    <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden shadow-xl relative">
      {images.map((slide, i) => (
        <div
          key={i}
          className="keen-slider__slide relative h-72 md:h-[450px] flex items-center justify-center"
        >
          <img
            src={slide.src}
            alt={`Slide ${i}`}
            className="absolute inset-0 w-full h-full object-cover brightness-[0.5]"
          />

          {/* Overlay Content */}
          <div className="relative z-10 text-center text-white space-y-4 px-4 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold">
              <Typewriter
                options={{
                  strings: [slide.heading, slide.subheading],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h2>

            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              <Button onClick={() => navigate("/add-book")} variant="secondary" className="bg-yellow-400 hover:bg-yellow-300 text-black">
                Add Book
              </Button>
              <Button onClick={() => navigate("/all-books")} variant="outline" className="border-white text-black hover:bg-white hover:text-black">
                Show All Books
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
