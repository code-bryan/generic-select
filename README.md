## React-Select
An easy way to build customizable selects - dropdowns using ReactJS

### How to install

``` npm install @bryancode/react-select ```

or 

``` yarn add @bryancode/react-select ```


### Simple use example

```ts

import { Select, OptionInterface } from '@bryancode/react-select';
import '@bryancode/react-select/dist/index.css'
import { useState } from 'react';

const options: OptionInterface[] = [
  {
    value: 1,
    content: 'Monica',
  },
  {
    value: 2,
    content: 'Raul',
  }
];

export default function Home() {
  const [select, setSelect] = useState<OptionInterface>();

  return (
    <div>
      <Select
        options={options}
        value={select?.value}
        placeholder='Select Example'
        onChange={(value) => setSelect(value)}
      />
    </div>
  );
}

```

### Dependencies

- react-icons
- classnames 