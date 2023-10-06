type AddressNotFound = 'AddressNotFoundError';
export class AddressNotFoundError extends Error {
  name: AddressNotFound;
  constructor() {
    super();
    this.message = 'Endereço não encontrado';
    this.name = 'AddressNotFoundError';
  }
}
