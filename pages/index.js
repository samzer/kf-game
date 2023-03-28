import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from 'kfgame/styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import { initialLevels, generateLevel, investorNames } from './levels';

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [levels, setLevels] = useState(initialLevels);
  const [selectedInvestor, setSelectedInvestor] = useState();
  const [totalScore, setTotalScore] = useState(0);
  const [timer, setTimer] = useState(60); // Change the timer value based on your game requirements
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
      Math.abs(investor.investmentSize - smallBusiness.inventoryNeeds) /
      smallBusiness.inventoryNeeds;
    let rateScore =
      Math.abs(investor.interestRate - smallBusiness.preferredInterestRate) /
      smallBusiness.preferredInterestRate;
    let timelineScore =
      Math.abs(investor.timeline - smallBusiness.preferredTimeline) /
      smallBusiness.preferredTimeline;
  
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
      const randomizedLevels = levels.map((_, i) => {
        const level = generateLevel(i);
        return {
          ...level,
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
    <div className="App">
      {gameOver ? (
      <div>
        <h1>Game Over!</h1>
        <p>Your total score is: {Math.round(totalScore)}</p>
      </div>
    ) : (
      <div>
      <h1>Kickfurther Matching Game</h1>
      <p>Level: {levelIndex + 1}</p>
      <p>Total Score: {totalScore}</p>
      <p>Timer: {timer} seconds</p>
      <h2>Small Business Details</h2>
      <div>
        <p>Name: {smallBusiness.name}</p>
        <p>Inventory Needs: ${smallBusiness.inventoryNeeds}</p>
        <p>Preferred Interest Rate: {Math.round(smallBusiness.preferredInterestRate * 100)}%</p>
        <p>Preferred Timeline: {smallBusiness.preferredTimeline} months</p>
      </div>

      <h2>Potential Investors</h2>
      <div>
            {potentialInvestors.map((investor, index) => (
        <div
          key={index}
          style={{
            backgroundColor: selectedInvestorStatus[index] ? "green" : "black",
          }}
        >
          <div>
            <p>Name: {investor.name}</p>
            <p>Investment Size: ${investor.investmentSize}</p>
            <p>Interest Rate: {Math.round(investor.interestRate * 100)}%</p>
            <p>Timeline: {investor.timeline} months</p>
          </div>
          <button
            onClick={() => handleInvestorSelection(investor, index)}
            disabled={selectedInvestorStatus[index]}
          >
            Select Investor
          </button>
        </div>
      ))}
      </div>

      <button onClick={handleNextLevel}>Next Level</button>
      {timer > 0 ? handleTimer() : handleGameOver()}
    </div>
    )
}
</div>
)
}
