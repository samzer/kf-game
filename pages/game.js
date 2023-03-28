import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from 'kfgame/styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import { initialLevels, generateLevel, investorNames, businessNames } from '../components/levels';

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [levels, setLevels] = useState(initialLevels);
  const [selectedInvestor, setSelectedInvestor] = useState();
  const [totalScore, setTotalScore] = useState(0);
  const [timer, setTimer] = useState(120); // Change the timer value based on your game requirements
  const { smallBusiness, potentialInvestors } = levels[levelIndex];
  const [selectedInvestorStatus, setSelectedInvestorStatus] = useState(
    Array(potentialInvestors.length).fill(false)
  );
  const [gameOver, setGameOver] = useState(false);


  const handleInvestorSelection = (investor) => {
    setSelectedInvestor(investor);
      const score = calculateScore(investor);
      setTotalScore(totalScore + score);
      handleNextLevel();
  };

   const calculateScore = (investor) => {
    let sizeScore =
      Math.abs(investor.investmentSize - smallBusiness.inventoryNeeds) / smallBusiness.inventoryNeeds;
    let rateScore =
      Math.abs(investor.interestRate - smallBusiness.preferredInterestRate) / smallBusiness.preferredInterestRate;
    let timelineScore =
      Math.abs(investor.timeline - smallBusiness.preferredTimeline) / smallBusiness.preferredTimeline;
    
    const totalScore =
      (1 - sizeScore) * 0.4 + (1 - rateScore) * 0.3 + (1 - timelineScore) * 0.3;
    return totalScore * 100;
  };
  

  const handleNextLevel = () => {
    if (levelIndex < initialLevels.length - 1) {
      setLevelIndex(levelIndex + 1);
      setSelectedInvestorStatus(Array(initialLevels[levelIndex + 1].potentialInvestors.length).fill(false));
    } else {
      handleGameOver();
    }
  };

  const handleTimer = () => {
    setTimeout(() => {
      setTimer(timer - 1);
      if (timer === 0) {
        handleGameOver();
      }
    }, 1000);
  };

  const handleGameOver = () => {
    setGameOver(true);
  };

  useEffect(() => {
    const randomizeLevels = () => {
      const shuffledInvestorNames = [...investorNames].sort(() => Math.random() - 0.5);
      const shuffledBusinessNames = [...businessNames].sort(() => Math.random() - 0.5);

      const randomizedLevels = levels.map((_, i) => {
        const level = generateLevel(i);
        return {
          ...level,
          smallBusiness: {
              ...level.smallBusiness,
              name: shuffledBusinessNames[i * 3 ],
            },
          potentialInvestors: level.potentialInvestors.map((investor, j) => {
            return {
              ...investor,
              name: shuffledInvestorNames[i * 3 + j],
            };
          }),
        };
      });
      setLevels(randomizedLevels);
    };

    randomizeLevels();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <img src="/kickfurther-logo.png" alt="Kickfurther Logo" className="w-48 mx-auto mb-8" />
          {gameOver ? (
            <div className="text-center">
              <h1 className="text-4xl font-bold text-black">Game Over!</h1>
              <p className="text-xl mt-4 text-black">Your total score is: {Math.round(totalScore)}</p>
            </div>
          ) : (
            <div>
              <h1 className="text-4xl font-bold text-black">Kickfurther Matching Game</h1>
              <div className="mt-4 text-black">
                <p>Level: {levelIndex + 1}</p>
                <p>Total Score: {Math.round(totalScore)}</p>
              </div>
              <h2 className="text-2xl font-semibold mt-6 text-black">Small Business Details</h2>
              <div className="mt-4 text-black">
                <p>Name: {smallBusiness.name}</p>
                <p>Inventory Needs: ${smallBusiness.inventoryNeeds}</p>
                <p>Preferred Interest Rate: {Math.round(smallBusiness.preferredInterestRate * 100)}%</p>
                <p>Preferred Timeline: {smallBusiness.preferredTimeline} months</p>
              </div>
  
              <h2 className="text-2xl font-semibold mt-6 text-black">Potential Investors</h2>
              <div className="mt-4">
                {potentialInvestors.map((investor, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg shadow-md mb-4 ${selectedInvestorStatus[index] ? "bg-green-500" : "bg-black"}`}
                  >
                    <div className="text-white">
                      <p>Name: {investor.name}</p>
                      <p>Investment Size: ${investor.investmentSize}</p>
                      <p>Interest Rate: {Math.round(investor.interestRate * 100)}%</p>
                      <p>Timeline: {investor.timeline} months</p>
                    </div>
                    <button
                      onClick={() => handleInvestorSelection(investor, index)}
                      disabled={selectedInvestorStatus[index]}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
                    >
                      Select Investor
                    </button>
                  </div>
                ))}
              </div>
  
              {/* <button onClick={handleNextLevel} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4">
                Next Level
              </button> */}
              {timer > 0 ? handleTimer() : handleGameOver()}

              <div className="fixed bottom-8 right-8 p-4 bg-red-500 text-white rounded-lg shadow-md">
                <p>Timer: {timer} seconds</p>
              </div>
              <div className="fixed bottom-8 left-8 p-8 bg-blue-500 text-white rounded-lg shadow-md" style={{ fontSize: "1.5rem", width: "250px" }}>
                 <p>
                  <strong>Total Score: {Math.round(totalScore)} </strong>
                 </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
}
