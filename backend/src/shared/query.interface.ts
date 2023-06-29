export interface InterfaceQuery<IRequest, IResponse> {
  execute(data: IRequest): IResponse;
  execute(): IResponse;
}
