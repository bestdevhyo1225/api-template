declare module 'grpc-caller' {
  namespace TempService {
    interface FindRequest {
      requestId: number;
    }

    interface FindResponse {
      responseMessage: number;
    }
  }

  export interface GrpcCaller {
    FindUsers(reqData: TempService.FindRequest): Promise<TempService.FindResponse>;
  }

  export default function caller(host: string, proto: string | object, name: string): GrpcCaller;
}
