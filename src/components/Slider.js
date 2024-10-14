import React, { useState } from 'react';

const FullPageSlider = () => {
  const slides = [
    { id: 1, content: "Slide 1: Welcome to our website!" },
    { id: 2, content: "Slide 2: Enjoy our features!" },
    { id: 3, content: "Slide 3: Contact us for more information!" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleScroll = (event) => {
    if (event.deltaY > 0) {
      setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
    } else {
      setCurrentSlide((prev) => Math.max(prev - 1, 0));
    }
    event.preventDefault();
  };

  return (
    <div
      className="overflow-hidden"
      onWheel={handleScroll} // Handle scroll to navigate through slides
      style={{
        height: '100vh',
        scrollSnapType: 'y mandatory',
        overflowY: 'hidden',
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`flex items-center justify-center bg-gray-${index * 200 + 200} h-screen transition-transform duration-500 transform ${currentSlide === index ? 'translate-y-0' : '-translate-y-full'}`}
          style={{ scrollSnapAlign: 'start' }}
        >
          <h1 className="text-4xl font-bold text-white">{slide.content}</h1>
        </div>
      ))}
    </div>
  );
};

export default FullPageSlider;
