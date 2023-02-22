# @bytemd/plugin-file-upload

[![npm](https://img.shields.io/npm/v/@bytemd/plugin-file-upload.svg)](https://npm.im/@bytemd/plugin-file-upload)

ByteMD plugin to support file upload.

## Usage

```js
import pluginFile from '@bytemd/plugin-file-upload'
import pluginFileLocales from '@bytemd/plugin-file-upload/locales/zh_Hans.json';

import { Editor } from 'bytemd'

  const uploadFile = async (file: File) => {
    // retrun  download url  
    // return await handleFile(file); 
    return ''
  };

new Editor({
  target: document.body,
  props: {
    plugins: [
       pluginFile({ locale: pluginFileLocales, uploadFile }),
      // ... other plugins
    ],
  },
})
```

## License

MIT
