declare module 'frogilogs' {
    type MessageType = 'condensed' | 'detailed' | 'pretty' | 'important';
    export default class Logger {
      log(message: string, messageType?: MessageType, obj?: any): void;
      logObject(obj: any, message?: string): void;
      info(message: string, messageType?: MessageType, obj?: any): void;
      warn(message: string, messageType?: MessageType, obj?: any): void;
      error(message: string, messageType?: MessageType, obj?: any): void;
    }
  }
  