export interface InterfaceUseCase<IRequest, IResponse> {
  execute(data: IRequest): IResponse;
}
