import React, { useEffect, useState } from 'react';
import './app.css';

const App = () => {
  const [displayValue, setDisplayValue] = useState('');  // Value to be displayed
  const [operator, setOperator] = useState(null);       // Current operator
  const [pendingValue, setPendingValue] = useState(null); // Previous operand
  const [isNewInput, setIsNewInput] = useState(true);   // To track if new input is expected

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleNumberClick(e.key);
      } else if (['+', '-', '/', '*'].includes(e.key)) {
        handleOperatorClick(e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        handleEquals();
      } else if (e.key === '.') {
        handleDecimal();
      } else if (e.key === 'Backspace' || e.key === 'c' || e.key === 'C') {
        handleClear();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClear = () => {
    setDisplayValue('');
    setPendingValue(null);
    setOperator(null);
    setIsNewInput(true);
  };

  const handleNumberClick = (num) => {
    if (isNewInput) {
      setDisplayValue(num);
      setIsNewInput(false);
    } else {
      setDisplayValue(prevValue => prevValue + num);
    }
  };

  const handleOperatorClick = (op) => {
    if (operator && !isNewInput) {
      handleEquals();
    }
    setPendingValue(parseFloat(displayValue));
    setOperator(op);
    setIsNewInput(true);
  };

  const handleEquals = () => {
    if (operator && pendingValue !== null) {
      const currentValue = parseFloat(displayValue);
      let result;
      switch (operator) {
        case '+':
          result = pendingValue + currentValue;
          break;
        case '-':
          result = pendingValue - currentValue;
          break;
        case '*':
          result = pendingValue * currentValue;
          break;
        case '/':
          result = pendingValue / currentValue;
          break;
        default:
          return;
      }
      setDisplayValue(result.toString());
      setOperator(null);
      setPendingValue(null);
      setIsNewInput(true);
    }
  };

  const handleDecimal = () => {
    if (isNewInput) {
      setDisplayValue('0.');
      setIsNewInput(false);
    } else if (!displayValue.includes('.')) {
      setDisplayValue(prevValue => prevValue + '.');
    }
  };

  return (
    <>
      <div className='headings'>
        <h1>CALCULATOR</h1>
        <h3>(Use Keyboard or Mouse)</h3>
        <h4>(press "c" to clear)</h4>
      </div>
      <div className='container'>
        <form className='calculator'>
          <input type='text' className='value' readOnly value={displayValue} placeholder='0' />
          <span className='num clear' onClick={handleClear}><i>C</i></span>
          <span className='num' onClick={() => handleOperatorClick('/')}><i>/</i></span>
          <span className='num' onClick={() => handleOperatorClick('*')}><i>*</i></span>
          <span className='num' onClick={() => handleNumberClick('7')}><i>7</i></span>
          <span className='num' onClick={() => handleNumberClick('8')}><i>8</i></span>
          <span className='num' onClick={() => handleNumberClick('9')}><i>9</i></span>
          <span className='num' onClick={() => handleOperatorClick('-')}><i>-</i></span>
          <span className='num' onClick={() => handleNumberClick('4')}><i>4</i></span>
          <span className='num' onClick={() => handleNumberClick('5')}><i>5</i></span>
          <span className='num' onClick={() => handleNumberClick('6')}><i>6</i></span>
          <span className='num plus' onClick={() => handleOperatorClick('+')}><i>+</i></span>
          <span className='num' onClick={() => handleNumberClick('1')}><i>1</i></span>
          <span className='num' onClick={() => handleNumberClick('2')}><i>2</i></span>
          <span className='num' onClick={() => handleNumberClick('3')}><i>3</i></span>
          <span className='num' onClick={() => handleNumberClick('0')}><i>0</i></span>
          <span className='num' onClick={() => handleNumberClick('00')}><i>00</i></span>
          <span className='num' onClick={handleDecimal}><i>.</i></span>
          <span className='num equal' onClick={handleEquals}><i>=</i></span>
        </form>
      </div>
    </>
  );
};

export default App;
