import { useState } from "react"

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode]); //initializing history as an array with the first mode that gets passed to useVisualMode

  function transition(newMode, replace = false) { //allow us to advance to any other mode
    if (replace) {
      setMode(newMode); //if replace is true, change to newMode
    } else {
      setMode(newMode); //if replace is true, change mode
      setHistory(prev => ([...prev, newMode])); //AND add newMode to history array (top of data stack)
    }
  }

  function back() { //allow us to return to the previous mode
    if (history.length > 1) { //prevent the user to go back past the initial mode
      history.pop(); //remove last item from history array (top of data array)
      setMode(history[history.length - 1]); //setMode with the now last item in history array
    }
  };

  return { mode, transition, back };
};