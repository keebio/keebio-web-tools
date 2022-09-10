import React from 'react';
import { Textarea } from "baseui/textarea";
import {Block} from 'baseui/block'
import './App.css';

function App() {
  const [originalJSON, setOriginalJSON] = React.useState('');
  const [kleUpdate, setKLEUpdate] = React.useState('');
  const [outputJSON, setOutputJSON] = React.useState('');

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

  // TODO: Update VIA JSON update
  const updateOutput = (inputJSON: string, inputKLE: string) => {
    const newOutput = inputJSON + inputKLE;
    setOutputJSON(newOutput);
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
          />
          <h2>Paste raw KLE JSON here:</h2>
          <Textarea
            value={kleUpdate}
            onChange={handleKLEChange}
            placeholder="New Raw KLE JSON..."
          />
          <h2>Updated VIA JSON:</h2>
          <Textarea readOnly value={outputJSON} />
        </Block>
      </React.Fragment>
    </div>
  );
}

export default App;
