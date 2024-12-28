const EventEmitter = require('events');
const fsy = require('fs');

const readAndWriteItem = (filePath: string, inputKey: string, inputValue: string) => {
  // 이벤트 생성
  class FileEventEmitter extends EventEmitter {}
  const fileEvent = new FileEventEmitter();

  /*파일 읽기 이벤트 핸들러 추가*/
  fileEvent.on(
    'readFile',
    (
      path: string,
      key: string,
      value: string,
      writeCb: (writePath: string, writeValue: string) => void
    ) => {
      fsy.readFile(path, 'utf8', (err: any, fileData: string) => {
        // 기존 데이터 불러오기
        const newData = [];
        try {
          newData.push(...JSON.parse(fileData));
        } catch (err) {
          console.error('parsing err : ', err);
        }

        // 새로운 데이터 입력
        newData.push({
          id: Math.random(),
          [key]: decodeURI(value),
        });

        // 새로운 데이터를 문자열로 변경
        const strNewData = JSON.stringify(newData, null, 2);
        // 파일 쓰기 이벤트 시작
        writeCb(path, strNewData);
      });
    }
  );

  /*파일 읽기 이벤트 호출*/
  fileEvent.emit(
    'readFile',
    filePath,
    inputKey,
    inputValue,
    (writePath: string, writeData: string) => {
      // 파일 쓰기 메소드 호출
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
