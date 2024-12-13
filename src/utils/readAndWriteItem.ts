const EventEmitter = require('events');
const fsy = require('fs');

const readAndWriteItem = (filePath: string, key: string, value: string) => {
  // 이벤트 생성
  class FileEventEmitter extends EventEmitter {}
  const fileEvent = new FileEventEmitter();

  // 파일 읽기 이벤트 처리
  fileEvent.on(
    'readFile',
    (
      filePath: string,
      inputKey: string,
      inputValue: string,
      writeCb: (writePath: string, writeValue: string) => void
    ) => {
      fsy.readFile(filePath, 'utf8', (err: any, fileData: string) => {
        console.log('data : ', fileData);
        console.log('data type : ', typeof fileData);

        const newData = [];
        try {
          newData.push(...JSON.parse(fileData));
        } catch (err) {
          console.error('parsing err : ', err);
        }
        newData.push({
          id: Math.random(),
          [inputKey]: decodeURI(inputValue),
        });

        const strNewData = JSON.stringify(newData);
        const replaceNewData = strNewData
          .replace(/},/g, '},\n')
          .replace(/\[/g, '[\n')
          .replace(/]/g, '\n]');
        // 파일 쓰기 이벤트 시작
        writeCb(filePath, replaceNewData);
      });
    }
  );

  // 파일 읽기 이벤트 시작
  fileEvent.emit(
    'readFile',
    filePath,
    key,
    value,
    (writePath: string, writeData: string) => {
      // 파일 쓰기 이벤트 처리
      fsy.writeFile(writePath, writeData, (err: any) => {
        if (err) {
          console.error('Error writing file:', err);
          return;
        }
        console.log('File writing ended.');
      });
    }
  );
};

module.exports = readAndWriteItem;
