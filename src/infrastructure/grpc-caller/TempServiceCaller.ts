import glob from 'glob';
import caller, { GrpcCaller } from 'grpc-caller';
import config from '@common/config';

export default class TempServiceCaller {
  private readonly caller: GrpcCaller;

  constructor() {
    const { tempApiGrpcServer } = config;
    const [protoPath]: string[] = glob.sync('idl/temp.proto');
    this.caller = caller(tempApiGrpcServer, protoPath, 'TempService');
  }

  public getCaller(): GrpcCaller {
    return this.caller;
  }
}
