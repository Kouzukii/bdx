// @flow
import { spawn } from 'child_process';
import { createInterface } from 'readline';
import type { ChildProcess } from 'child_process';

export type messageType = {
  +type: string,
  +payload?: any
};

export default class NativeServer {
  childProcess: ChildProcess;

  onError = (e: Error) => {
    console.log(JSON.stringify(e));
  };

  onClose = () => {
    console.log('bdxnative process exited');
  };

  start(dispatch: (action: *) => void) {
    this.childProcess = spawn(
      process.env.NODE_ENV === 'development'
        ? 'bin/bdxnative.exe'
        : 'bdxnative.exe',
      [],
      {
        windowsHide: true,
        stdio: ['ignore', 'pipe', 'pipe', 'pipe'],
        env: { BDX_FD: 3 }
      }
    )
      .on('exit', this.onClose)
      .on('error', this.onError);
    this.childProcess.stdout.on('data', data =>
      console.log(`bdnative: ${data}`)
    );
    this.childProcess.stderr.on('data', data =>
      console.log(`bdnative: ERR ${data}`)
    );
    this.childProcess.stdio[3].setEncoding('utf8');
    createInterface({
      input: this.childProcess.stdio[3]
    }).on('line', line => dispatch(JSON.parse(line)));
  }

  send(message: messageType) {
    this.childProcess.stdio[3].write(JSON.stringify(message) + '\n');
  }
}
