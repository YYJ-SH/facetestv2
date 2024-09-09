'use client';
import React, { useState, useEffect } from 'react';
import { shuffle } from 'lodash';

const Stage2 = ({ metadata, onComplete }) => {
  const [celebrities, setCelebrities] = useState([]);
  const [currentCelebrity, setCurrentCelebrity] = useState(null);
  const [selectedImages, setSelectedImages] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const shuffledCelebrities = shuffle(metadata.celebrities);
    setCelebrities(shuffledCelebrities);
    setCurrentCelebrity(shuffledCelebrities[0]);
  }, [metadata]);

  const handleImageSelect = (imageSrc) => {
    setSelectedImages(prev => ({
      ...prev,
      [currentCelebrity.name]: prev[currentCelebrity.name]?.includes(imageSrc)
        ? prev[currentCelebrity.name].filter(src => src !== imageSrc)
        : [...(prev[currentCelebrity.name] || []), imageSrc]
    }));
  };

  const handleNext = () => {
    if (currentIndex < celebrities.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentCelebrity(celebrities[currentIndex + 1]);
    } else {
      onComplete(selectedImages);
    }
  };

  if (!currentCelebrity) return <div className="text-center text-xl mt-8">Loading...</div>;

  return (
    <div className="space-y-4 px-2 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-center">Stage 2: 알아볼 것 같은 사진 선택</h2>
      <p className="text-lg sm:text-xl text-center">알아볼 것 같은 사진을 모두 골라주세요.</p>
      <h3 className="text-lg sm:text-xl font-semibold">{currentCelebrity.name}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
        {currentCelebrity.images.filter(img => img.effect !== 'original').map((img, index) => (
          <div
            key={index}
            className={`cursor-pointer border-4 rounded-lg ${
              selectedImages[currentCelebrity.name]?.includes(img.src) ? 'border-green-500' : 'border-transparent'
            }`}
            onClick={() => handleImageSelect(img.src)}
          >
            <img src={`/images/${img.src}`} alt={`${img.effect} ${img.strength || ''}`} className="w-full rounded-lg" />
            <p className="text-center mt-1 text-xs sm:text-sm">{`${img.effect} ${img.strength || ''}`}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button
          onClick={handleNext}
          className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {currentIndex === celebrities.length - 1 ? '완료' : '다음'}
        </button>
      </div>
      <div className="text-center text-sm text-gray-600">
        {currentIndex + 1} / {celebrities.length}
      </div>
    </div>
  );
};

export default Stage2;