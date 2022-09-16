import React from 'react';
import { Container, Textarea } from '@mantine/core';
import { Prism } from '@mantine/prism';
import json5 from "json5";
import './App.css';

function App() {
  const [originalJSON, setOriginalJSON] = React.useState('');
  const [kleUpdate, setKLEUpdate] = React.useState('');
  const [outputJSON, setOutputJSON] = React.useState('');
  const [originalKLE, setOriginalKLE] = React.useState('');
  const [isValidJSON, setIsValidJSON] = React.useState(false);
  const [isValidKLE, setIsValidKLE] = React.useState(false);

  const handleJSONChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newJSON = event.target.value
    setOriginalJSON(newJSON);
    console.log(newJSON);
    updateOutput(newJSON, kleUpdate);
    updateOriginalKLE(newJSON);
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

  const updateOriginalKLE = (inputJSON: string) => {
    setOriginalKLE('');
    const newJSON = parseInputJSON(inputJSON);
    if (newJSON != null) {
      var output = newJSON as any;
      console.log('keymap: ' + output.layouts.keymap);
      setOriginalKLE(JSON.stringify(output.layouts.keymap).replace(/^\[|]$/g, ''));
    }
  }

  return (
    <div className="App">
      <React.Fragment>
        <Container>
          <h1>VIA JSON Updater Tool</h1>
          <h3>Paste original VIA JSON here:</h3>
          <Textarea
            value={originalJSON}
            onChange={handleJSONChange}
            placeholder="Original VIA JSON..."
            error={!isValidJSON}
            autosize
            minRows={8}
            maxRows={12}
          />
          <h3>Original KLE from VIA JSON (to paste into Raw data in KLE):</h3>
          <Prism
            colorScheme="dark"
            language="json"
          >
            {originalKLE}
          </Prism>
          <h3>Paste updated Raw data from KLE here:</h3>
          <Textarea
            value={kleUpdate}
            onChange={handleKLEChange}
            placeholder="New Raw KLE JSON..."
            error={!isValidKLE}
            autosize
            minRows={8}
            maxRows={12}
          />
          <h3>Updated VIA JSON:</h3>
          <Prism
            colorScheme="dark"
            language="json"
          >
            {outputJSON}
          </Prism>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default App;
