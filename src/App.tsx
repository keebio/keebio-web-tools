import React from 'react';
import { Textarea } from "baseui/textarea";
import { Block } from 'baseui/block'
import { Button } from "baseui/button";
import json5 from "json5";
import './App.css';

function App() {
  const [originalJSON, setOriginalJSON] = React.useState('');
  const [kleUpdate, setKLEUpdate] = React.useState('');
  const [outputJSON, setOutputJSON] = React.useState('');
  const [isValidJSON, setIsValidJSON] = React.useState(false);
  const [isValidKLE, setIsValidKLE] = React.useState(false);

  const handleJSONChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newJSON = event.target.value
    setOriginalJSON(newJSON);
    console.log(newJSON);
    updateOutput(newJSON, kleUpdate);
  };

  const handleKLEChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newKLE = event.target.value
    setKLEUpdate(newKLE);
    console.log(newKLE);
    updateOutput(originalJSON, newKLE);
  };

  const parseInputJSON = (input: string): object | null => {
    try {
      const output = json5.parse(input);
      setIsValidJSON(true);
      return output;
    } catch {
      setIsValidJSON(false);
      return null;
    }
  }

  const parseInputKLE = (input: string): object | null => {
    if (input === '') {
      setIsValidKLE(false);
      return null;
    }
    try {
      const output = json5.parse('[' + input + ']');
      setIsValidKLE(true);
      return output;
    } catch {
      setIsValidKLE(false);
      return null;
    }
  }

  const updateOutput = (inputJSON: string, inputKLE: string) => {
    setOutputJSON('');
    const newJSON = parseInputJSON(inputJSON);
    const keymap = parseInputKLE(inputKLE);
    if (newJSON != null && keymap != null) {
      var output = newJSON as any;
      output.layouts.keymap = keymap;
      console.log(output);
      setOutputJSON(JSON.stringify(output, null, 2));
    }
  }

  const copyOutputToClipboard = () => {
    navigator.clipboard.writeText(outputJSON);
  }

  return (
    <div className="App">
      <React.Fragment>
        <Block width={['800px']}>
          <h1>VIA JSON Updater Tool</h1>
          <h2>Paste original JSON here:</h2>
          <Textarea
            value={originalJSON}
            onChange={handleJSONChange}
            placeholder="Original VIA JSON..."
            positive={isValidJSON}
            error={!isValidJSON}
          />
          <h2>Paste raw KLE JSON here:</h2>
          <Textarea
            value={kleUpdate}
            onChange={handleKLEChange}
            placeholder="New Raw KLE JSON..."
            positive={isValidKLE}
            error={!isValidKLE}
          />
          <h2>Updated VIA JSON:</h2>
          <Textarea readOnly value={outputJSON} />
          <br/>
          <Button onClick={copyOutputToClipboard} disabled={outputJSON === ''}>Copy</Button>
        </Block>
      </React.Fragment>
    </div>
  );
}

export default App;
