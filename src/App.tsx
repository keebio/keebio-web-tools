import React from 'react';
import { Container, Textarea, ScrollArea } from '@mantine/core';
import { Prism } from '@mantine/prism';
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
        <Container>
          <h1>VIA JSON Updater Tool</h1>
          <Textarea
            label="Paste original JSON here:"
            value={originalJSON}
            onChange={handleJSONChange}
            placeholder="Original VIA JSON..."
            error={!isValidJSON}
            autosize
            minRows={4}
            maxRows={10}
          />
          <Textarea
            label="Paste raw KLE JSON here:"
            value={kleUpdate}
            onChange={handleKLEChange}
            placeholder="New Raw KLE JSON..."
            error={!isValidKLE}
            autosize
            minRows={4}
            maxRows={10}
          />
          <h2>Updated VIA JSON:</h2>
          <ScrollArea style={{ height: 250 }}>
            <Prism language="json">{outputJSON}</Prism>
          </ScrollArea>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default App;
