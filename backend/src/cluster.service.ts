/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-types */
const cluster = require('cluster');
import { Injectable } from '@nestjs/common';
const numberOfCpus = 4;

@Injectable()
export class ClusterService {
  static clusterize(callback: Function): void {
    if (cluster.isPrimary) {
      console.log(`Primary ${process.pid} is running`);
      console.log(`Forking Server with ${numberOfCpus} processes \n`);

      for (let index = 0; index < numberOfCpus; index++) {
        cluster.fork();
      }
      cluster.on('exit', (worker, code) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
          console.log(`Worker ${worker.process.pid} died. Restarting`);
          cluster.fork();
        }
      });
    } else {
      console.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  }
}
