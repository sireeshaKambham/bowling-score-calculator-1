import './App.css';
import Button from '../src/ui/components/shared/Button';
import { useState } from 'react';

function BowlingGame() {
  const [numberOfPins, setNumberOfPins] = useState('');
  const [currentScoreIndex, setCurrentScoreIndex] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [score, setScore] = useState<any>(new Array(10).fill(' '));
  const [frames, setFrames] = useState<any>(new Array(10).fill({try1: ' ', try2: ' '}));
  const [currentPins, setCurrentPins] = useState<number>(10);
  const [currentFrame, setcurrentFrame] = useState<number>(0);
  const [tryCount, setTryCount] = useState(1);
  const [err, setErr] = useState('');

  const updateScore = (pins: any) => {
    if(currentPins - parseInt(pins) === 0 && parseInt(pins) !=0) {
      /** do nothing */
    } else if(parseInt(pins) <= currentPins) {
      console.log(frames[currentFrame - 1].try1 + frames[currentFrame-1].try2);
      if(currentFrame > 0 && frames[currentFrame - 1].try1 + frames[currentFrame-1].try2 === 10) {
        setScore((scoreCount: any) => {
          // console.log('pins...'+ 10 + parseInt(pins));
          let temp = scoreCount;
        temp[currentScoreIndex - 1] = 10 + parseInt(pins);
        return temp;
        })
      }
      setScore((scoreCount: any)=> { 
        let temp = scoreCount;
        temp[currentScoreIndex] = currentScore + parseInt(pins);
        return temp;
      });
      setCurrentScore(currentScore + parseInt(pins));
      if(tryCount === 2) {
        setCurrentScoreIndex( currentScoreIndex + 1);
      }
      setFinalScore(finalScore + parseInt(pins));
    } 
  }

  const throwBall = (pins: string) => {
    if(parseInt(pins) === 10) {
      // console.log('1....'+pins, currentPins);
      setErr('');
      setFrames((currentFrameVal: any) => {
        let temp = currentFrameVal;
          temp[currentFrame] = {...temp[currentFrame], try1: 'X' }
        setCurrentPins(currentPins - parseInt(pins));
        if(currentFrame < 10) {
          setcurrentFrame(currentFrame + 1);
          setCurrentPins(10);
        }
        return temp;
      })
    } else if(currentPins - parseInt(pins) === 0 && parseInt(pins) !=0) {
    // console.log('2....'+pins, currentPins);
      setErr('');
      setFrames((currentFrameVal: any) => {
        let temp = currentFrameVal;
          temp[currentFrame] = {...temp[currentFrame], try2: '/' }   
        setTryCount(tryCount === 1 ? 2 : 1);
        setCurrentPins(currentPins - parseInt(pins));
        if(currentFrame < 10 && tryCount === 2) {
          setcurrentFrame(currentFrame + 1);
          setCurrentPins(10);
        }
        return temp;
      })
    }
    else {
      if (parseInt(pins) <= currentPins) {
      // console.log('3.....' +pins, currentPins);
        setErr('');
        updateScore(pins);
        setCurrentPins(currentPins - parseInt(pins));
        setFrames((currentFrameVal: any) => {
          let temp = currentFrameVal;
          if(tryCount === 1) {
            temp[currentFrame] = {...temp[currentFrame], try1: pins }
          } else {
            temp[currentFrame] = {...temp[currentFrame], try2: pins }
          }
          setTryCount(tryCount === 1 ? 2 : 1);
          setCurrentPins(currentPins - parseInt(pins));
          if(currentFrame < 10 && tryCount === 2) {
            setcurrentFrame(currentFrame + 1);
            setCurrentPins(10);
          }
          return temp;
        })
      } else { setErr('Not enough pins');}
    }
  }

  const getScore = () => {

  }

  const handleReset = () => {
    setNumberOfPins('');
  }

  return (
    <div className='bsc-container'>
      <div className='header'>
        <h3>Ten pin bowling</h3>
        <h5 className='welcome-text'>Welcome User</h5>
      </div>
      <div className='content'>
        <div className='logo ml-30'>
          <img src='/BT-logo.png' alt='logo' />
        </div>
        <div className='input-section'>
          <input type='text' placeholder='Enter score' onChange={(e) => setNumberOfPins(e.target.value)} />
          <Button name='Strike' className='ml-10' onClick={() => throwBall(numberOfPins)} /> {err}
        </div>
        <div className='result-section m-30'>
          <table>
            <tbody>
              <tr>
                {frames.map((item: any) => {
                  return <><td>{item.try1}</td><td>{item.try2}</td></>
                })}
                <td>Total score</td>
              </tr>
              <tr style={{ height: '50px' }}>
                {score.map( (item: any) => <td colSpan={2}>{item}</td> )}
                <td>{finalScore}</td>
              </tr>
            </tbody>
          </table>
          <Button name='Reset' className='mt-20' onClick={handleReset} />
        </div>
      </div>
    </div>
  );
}

export default BowlingGame;
