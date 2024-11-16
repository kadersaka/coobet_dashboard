interface ClaimJSON {
  id?: string;
  email: string;
  fullname: string;
  message: string;
  user: string;
}

class Claim {
  id?: string;
  email: string;
  fullname: string;
  message: string;
  user: string;

  constructor(
    email: string,
    fullname: string,
    message: string,
    user: string,
    id?: string,
  ) {
    this.email = email;
    this.fullname = fullname;
    this.message = message;
    this.user = user;
    this.id = id;
  }

  static fromJson(json: ClaimJSON): Claim {
    return new Claim(
      json.email,
      json.fullname,
      json.message,
      json.user,
      json.id,
    );
  }

  toJson(): ClaimJSON {
    return {
      id: this.id,
      email: this.email,
      fullname: this.fullname,
      message: this.message,
      user: this.user,
    };
  }
}

export default Claim;
