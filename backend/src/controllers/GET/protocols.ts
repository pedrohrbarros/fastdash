export enum SELECTUSERPROPERTIES {
  LOGIN = 'id, email, password',
  LIST = 'firstname, lastname, email',
  PROFILE = 'firstname, lastname, email, phone',
}

export enum SELECTPRODUCTPROPERTIES {
  ALL = 'id, name, price',
}

export enum SELECTSELLERPROPERTIES {
  LIST = 'id, name',
  ALL = 'id, name, age, location',
}

export enum SELECTSALEPROPERTIES {
  LIST = 'sa.id, s.name, p.name',
  ALL = 'sa.id, p.name, p.price, s.name, s.age, s.location',
}
