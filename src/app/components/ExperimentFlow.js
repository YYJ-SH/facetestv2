'use client';
import React, { useState } from 'react';
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Stage3 from './Stage3';
import ResultPage from './ResultPage';

const metadata = {
    "celebrities": [
      {
        "name": "김지원",
        "images": [
          {"src": "김지원_original.png", "effect": "original"},
          {"src": "김지원_pixel_50.png", "effect": "pixel", "strength": 50},
          {"src": "김지원_pixel_60.png", "effect": "pixel", "strength": 60},
          {"src": "김지원_pixel_70.png", "effect": "pixel", "strength": 70},
          {"src": "김지원_pixel_80.png", "effect": "pixel", "strength": 80},
          {"src": "김지원_pixel_90.png", "effect": "pixel", "strength": 90},
          {"src": "김지원_blur_50.png", "effect": "blur", "strength": 50},
          {"src": "김지원_blur_60.png", "effect": "blur", "strength": 60},
          {"src": "김지원_blur_70.png", "effect": "blur", "strength": 70},
          {"src": "김지원_blur_80.png", "effect": "blur", "strength": 80},
          {"src": "김지원_blur_90.png", "effect": "blur", "strength": 90},
          {"src": "김지원_mask.png", "effect": "mask"}
        ]
      },
      {
        "name": "서강준",
        "images": [
          {"src": "서강준_original.png", "effect": "original"},
          {"src": "서강준_pixel_50.png", "effect": "pixel", "strength": 50},
          {"src": "서강준_pixel_60.png", "effect": "pixel", "strength": 60},
          {"src": "서강준_pixel_70.png", "effect": "pixel", "strength": 70},
          {"src": "서강준_pixel_80.png", "effect": "pixel", "strength": 80},
          {"src": "서강준_pixel_90.png", "effect": "pixel", "strength": 90},
          {"src": "서강준_blur_50.png", "effect": "blur", "strength": 50},
          {"src": "서강준_blur_60.png", "effect": "blur", "strength": 60},
          {"src": "서강준_blur_70.png", "effect": "blur", "strength": 70},
          {"src": "서강준_blur_80.png", "effect": "blur", "strength": 80},
          {"src": "서강준_blur_90.png", "effect": "blur", "strength": 90},
          {"src": "서강준_mask.png", "effect": "mask"}
        ]
      },
      {
        "name": "하지원",
        "images": [
          {"src": "하지원_original.png", "effect": "original"},
          {"src": "하지원_pixel_50.png", "effect": "pixel", "strength": 50},
          {"src": "하지원_pixel_60.png", "effect": "pixel", "strength": 60},
          {"src": "하지원_pixel_70.png", "effect": "pixel", "strength": 70},
          {"src": "하지원_pixel_80.png", "effect": "pixel", "strength": 80},
          {"src": "하지원_pixel_90.png", "effect": "pixel", "strength": 90},
          {"src": "하지원_blur_50.png", "effect": "blur", "strength": 50},
          {"src": "하지원_blur_60.png", "effect": "blur", "strength": 60},
          {"src": "하지원_blur_70.png", "effect": "blur", "strength": 70},
          {"src": "하지원_blur_80.png", "effect": "blur", "strength": 80},
          {"src": "하지원_blur_90.png", "effect": "blur", "strength": 90},
          {"src": "하지원_mask.png", "effect": "mask"}
        ]
      },
      {
        "name": "엄정화",
        "images": [
          {"src": "엄정화_original.png", "effect": "original"},
          {"src": "엄정화_pixel_50.png", "effect": "pixel", "strength": 50},
          {"src": "엄정화_pixel_60.png", "effect": "pixel", "strength": 60},
          {"src": "엄정화_pixel_70.png", "effect": "pixel", "strength": 70},
          {"src": "엄정화_pixel_80.png", "effect": "pixel", "strength": 80},
          {"src": "엄정화_pixel_90.png", "effect": "pixel", "strength": 90},
          {"src": "엄정화_blur_50.png", "effect": "blur", "strength": 50},
          {"src": "엄정화_blur_60.png", "effect": "blur", "strength": 60},
          {"src": "엄정화_blur_70.png", "effect": "blur", "strength": 70},
          {"src": "엄정화_blur_80.png", "effect": "blur", "strength": 80},
          {"src": "엄정화_blur_90.png", "effect": "blur", "strength": 90},
          {"src": "엄정화_mask.png", "effect": "mask"}
        ]
      },
      {
        "name": "권상우",
        "images": [
          {"src": "권상우_original.png", "effect": "original"},
          {"src": "권상우_pixel_50.png", "effect": "pixel", "strength": 50},
          {"src": "권상우_pixel_60.png", "effect": "pixel", "strength": 60},
          {"src": "권상우_pixel_70.png", "effect": "pixel", "strength": 70},
          {"src": "권상우_pixel_80.png", "effect": "pixel", "strength": 80},
          {"src": "권상우_pixel_90.png", "effect": "pixel", "strength": 90},
          {"src": "권상우_blur_50.png", "effect": "blur", "strength": 50},
          {"src": "권상우_blur_60.png", "effect": "blur", "strength": 60},
          {"src": "권상우_blur_70.png", "effect": "blur", "strength": 70},
          {"src": "권상우_blur_80.png", "effect": "blur", "strength": 80},
          {"src": "권상우_blur_90.png", "effect": "blur", "strength": 90},
          {"src": "권상우_mask.png", "effect": "mask"}
        ]
      },
      {
        "name": "이이경",
        "images": [
          {"src": "이이경_original.png", "effect": "original"},
          {"src": "이이경_pixel_50.png", "effect": "pixel", "strength": 50},
          {"src": "이이경_pixel_60.png", "effect": "pixel", "strength": 60},
          {"src": "이이경_pixel_70.png", "effect": "pixel", "strength": 70},
          {"src": "이이경_pixel_80.png", "effect": "pixel", "strength": 80},
          {"src": "이이경_pixel_90.png", "effect": "pixel", "strength": 90},
          {"src": "이이경_blur_50.png", "effect": "blur", "strength": 50},
          {"src": "이이경_blur_60.png", "effect": "blur", "strength": 60},
          {"src": "이이경_blur_70.png", "effect": "blur", "strength": 70},
          {"src": "이이경_blur_80.png", "effect": "blur", "strength": 80},
          {"src": "이이경_blur_90.png", "effect": "blur", "strength": 90},
          {"src": "이이경_mask.png", "effect": "mask"}
        ]
      }
    ]
  };

const ExperimentFlow = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [results, setResults] = useState({
    stage1: null,
    stage2: null,
    stage3: null
  });

  const handleStage1Complete = (stage1Results) => {
    setResults(prev => ({ ...prev, stage1: stage1Results }));
    setCurrentStage(2);
  };

  const handleStage2Complete = (stage2Results) => {
    setResults(prev => ({ ...prev, stage2: stage2Results }));
    setCurrentStage(3);
  };

  const handleStage3Complete = (stage3Results) => {
    setResults(prev => ({ ...prev, stage3: stage3Results }));
    setCurrentStage(4);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">이미지 비식별화 효과 실험</h1>
      {currentStage === 1 && (
        <Stage1 
          metadata={metadata} 
          onComplete={handleStage1Complete} 
        />
      )}
      {currentStage === 2 && (
        <Stage2 
          metadata={metadata} 
          stage1Results={results.stage1} 
          onComplete={handleStage2Complete} 
        />
      )}
      {currentStage === 3 && (
        <Stage3 
          metadata={metadata} 
          stage2Results={results.stage2} 
          onComplete={handleStage3Complete} 
        />
      )}
      {currentStage === 4 && (
        <ResultPage results={results} />
      )}
    </div>
  );
};

export default ExperimentFlow;