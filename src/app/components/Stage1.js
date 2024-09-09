'use client';
import React, { useState, useEffect } from 'react';
import { shuffle } from 'lodash';

const Stage1 = ({ metadata, onComplete }) => {
  const [allImages, setAllImages] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const shuffledImages = shuffle(metadata.celebrities.flatMap(celeb => 
      celeb.images.filter(img => img.effect !== 'original').map(img => ({
        ...img,
        celebName: celeb.name
      }))
    ));
    setAllImages(shuffledImages);
    setCurrentImages(shuffledImages.slice(0, 10));
  }, [metadata]);

  const handleImageSelect = (imageSrc, celebName) => {
    setSelectedImages(prev => ({
      ...prev,
      [celebName]: prev[celebName]
        ? prev[celebName].includes(imageSrc)
          ? prev[celebName].filter(src => src !== imageSrc)
          : [...prev[celebName], imageSrc]
        : [imageSrc]
    }));
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    const start = nextPage * 10;
    const end = start + 10;
    setCurrentImages(allImages.slice(start, end));
    setCurrentPage(nextPage);
  };

  const handleComplete = () => {
    // 선택된 이미지가 없는 연예인은 빈 배열로 설정
    const finalResults = metadata.celebrities.reduce((acc, celeb) => {
      acc[celeb.name] = selectedImages[celeb.name] || [];
      return acc;
    }, {});

    onComplete(finalResults);
  };

  return (
    <div className="space-y-4 px-2 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-center">Stage 1: 못 알아볼 것 같은 사진 선택</h2>
      <p className="text-lg sm:text-xl text-center">못 알아볼 것 같은 사진을 모두 골라주세요.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
        {currentImages.map((img, index) => (
          <div
            key={index}
            className={`cursor-pointer border-4 rounded-lg ${
              selectedImages[img.celebName]?.includes(img.src) ? 'border-blue-500' : 'border-transparent'
            }`}
            onClick={() => handleImageSelect(img.src, img.celebName)}
          >
            <img src={`/images/${img.src}`} alt={`${img.effect} ${img.strength || ''}`} className="w-full rounded-lg" />
            <p className="text-center mt-1 text-xs sm:text-sm">{`${img.effect} ${img.strength || ''}`}</p>
          </div>
        ))}
      </div>
      <div className="text-center space-y-2 sm:space-y-0 sm:space-x-4">
        {currentPage < Math.floor(allImages.length / 10) - 1 && (
          <button
            onClick={handleNextPage}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            다음 페이지
          </button>
        )}
        {currentPage === Math.floor(allImages.length / 10) - 1 && (
          <button
            onClick={handleComplete}
            className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            완료
          </button>
        )}
      </div>
      <div className="text-center text-sm text-gray-600">
        {currentPage + 1} / {Math.ceil(allImages.length / 10)} 페이지
      </div>
    </div>
  );
};

export default Stage1;