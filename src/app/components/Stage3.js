
'use client';
import React, { useState, useEffect } from 'react';
import { getHighestStrengthImage } from './utils';

const Stage3 = ({ metadata, stage2Results, onComplete }) => {
  const [currentCelebrity, setCurrentCelebrity] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const stage2Celebs = Object.keys(stage2Results);
    if (stage2Celebs.length > 0) {
      const celeb = metadata.celebrities.find(c => c.name === stage2Celebs[0]);
      setCurrentCelebrity(celeb);
      
      const selectedImages = stage2Results[celeb.name].map(src => 
        celeb.images.find(img => img.src === src)
      );
      const highestStrengthImage = getHighestStrengthImage(selectedImages);
      setCurrentImage(highestStrengthImage);
    }
  }, [metadata, stage2Results]);

  const handleAnswer = (answer) => {
    const newResult = { 
      name: currentCelebrity.name, 
      image: currentImage,
      answer: answer
    };
    const updatedResults = [...results, newResult];
    setResults(updatedResults);

    const stage2Celebs = Object.keys(stage2Results);
    if (updatedResults.length < stage2Celebs.length) {
      const nextCeleb = metadata.celebrities.find(c => c.name === stage2Celebs[updatedResults.length]);
      setCurrentCelebrity(nextCeleb);
      
      const selectedImages = stage2Results[nextCeleb.name].map(src => 
        nextCeleb.images.find(img => img.src === src)
      );
      const highestStrengthImage = getHighestStrengthImage(selectedImages);
      setCurrentImage(highestStrengthImage);
      setUserAnswer('');
    } else {
      onComplete(updatedResults);
    }
  };

  if (!currentCelebrity || !currentImage) return null;

  return (
    <div className="space-y-4 px-2 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-center">Stage 3: 이름 맞추기</h2>
      <p className="text-lg sm:text-xl text-center">이 사람의 이름은 무엇인가요?</p>
      <div className="flex justify-center">
        <img src={`/images/${currentImage.src}`} alt="Celebrity" className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-lg" />
      </div>
      <div className="space-y-2">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="이름을 입력하세요"
          className="w-full p-2 border rounded"
        />
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            onClick={() => handleAnswer(userAnswer)}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            제출
          </button>
          <button
            onClick={() => handleAnswer('얼굴은 알지만 이름은 정확히 기억나지 않음')}
            className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            얼굴은 알지만 이름은 정확히 기억나지 않음
          </button>
          <button
            onClick={() => handleAnswer('모르겠음')}
            className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            모르겠음
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stage3;