import React, { useState, useRef } from 'react';

const ResultPage = ({ results }) => {
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  const formatResultsForMessenger = () => {
    let formattedResults = "=== 이미지 비식별화 실험 결과 ===\n\n";
    
    // Stage 1 결과
    formattedResults += "[ Stage 1: 못 알아볼 것 같은 사진 선택 ]\n";
    Object.entries(results.stage1).forEach(([name, images]) => {
      formattedResults += `${name}:\n`;
      images.forEach(img => {
        const parts = img.split('_');
        const effect = parts[1];
        const strength = parts[2] ? parts[2].replace('.png', '') : '';
        formattedResults += `- ${effect}${strength ? ` ${strength}` : ''}\n`;
      });
      formattedResults += "\n";
    });

    // Stage 2 결과
    formattedResults += "[ Stage 2: 알아볼 것 같은 사진 선택 ]\n";
    Object.entries(results.stage2).forEach(([name, images]) => {
      formattedResults += `${name}:\n`;
      images.forEach(img => {
        const parts = img.split('_');
        const effect = parts[1];
        const strength = parts[2] ? parts[2].replace('.png', '') : '';
        formattedResults += `- ${effect}${strength ? ` ${strength}` : ''}\n`;
      });
      formattedResults += "\n";
    });

    // Stage 3 결과
    formattedResults += "[ Stage 3: 이름 맞추기 ]\n";
    results.stage3.forEach(result => {
      formattedResults += `${result.name}:\n`;
      formattedResults += `- 효과: ${result.image.effect}${result.image.strength ? ` ${result.image.strength}` : ''}\n`;
      formattedResults += `- 답변: ${result.answer}\n\n`;
    });

    return formattedResults;
  };

  const copyToClipboard = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      
      try {
        document.execCommand('copy');
        setCopySuccess('결과가 클립보드에 복사되었습니다!');
      } catch (err) {
        console.error('복사 중 오류 발생:', err);
        setCopySuccess('복사 실패. 아래 텍스트를 직접 선택하여 복사해주세요.');
      }

      // 선택 해제
      window.getSelection().removeAllRanges();
    }
    
    setTimeout(() => setCopySuccess(''), 3000);
  };

  return (
    <div className="space-y-4 px-2 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-center">실험 결과</h2>
      <div className="text-center space-y-2">
        <button 
          onClick={copyToClipboard}
          className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          결과 복사하기
        </button>
        {copySuccess && <p className="text-green-500 text-sm">{copySuccess}</p>}
      </div>
      <div className="bg-gray-100 p-2 sm:p-4 rounded-lg">
        <textarea
          ref={textAreaRef}
          readOnly
          className="w-full h-64 sm:h-96 p-2 sm:p-4 bg-transparent text-xs sm:text-sm font-mono resize-none focus:outline-none"
          value={formatResultsForMessenger()}
        />
      </div>
      <p className="text-xs sm:text-sm text-gray-600 text-center">
        위의 텍스트 영역에서 직접 결과를 선택하여 복사할 수도 있습니다.
      </p>
    </div>
  );
};

export default ResultPage;