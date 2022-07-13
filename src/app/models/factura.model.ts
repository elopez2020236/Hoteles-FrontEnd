export class Factura {
    constructor(
      public nombre: String,
      public Habitaciones:[{}],
      public Servicios: [{}],
      public TotalPaguar: Number
    ) {}
  }