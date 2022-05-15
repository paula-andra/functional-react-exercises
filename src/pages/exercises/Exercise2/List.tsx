import { VFC, useState } from "react";

import { Row } from "../../../components/Row";

export const List: VFC = () => {
  const [entries, setEntries] = useState<string[]>([]);
  const [entry, setEntry] = useState<string>('');

  const addEntry = () => setEntries([...entries, entry]);

  const sortEntries = () => setEntries([...entries.sort()]);

  return <>
    <Row>-----List----</Row>
    {entries.map((entry) =>
      <Row>
        {entry}
        <button>Remove entry</button>
      </Row>)
    }
    <Row>
      <input value={entry} onChange={(event) => setEntry(event.target.value)}/>
      <button onClick={addEntry}>
        Add entry
      </button>
      <button onClick={() => {
        addEntry();
        sortEntries();
      }}>Add entry and sort
      </button>
    </Row>
    <Row>
      <button onClick={sortEntries}>Sort entries
      </button>
    </Row>
  </>;
};