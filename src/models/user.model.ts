export interface UserJson {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_indicative: string;
  phone: string;
  date_joined: string;
  is_block: boolean;
  preference_notification?: string;
  last_login?: string;
  user_app_id?: string;
  referral_code?: string;
  referral_link?: string;
  access?: string;
  refresh?: string;
}

class User {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneIndicative: string;
  phone: string;
  dateJoined: Date;
  isBlock: boolean;
  preferenceNotification?: string;
  lastLogin?: Date;
  userAppId?: string;
  referralCode?: string;
  referralLink?: string;
  access?: string;
  refresh?: string;

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    phoneIndicative: string,
    phone: string,
    dateJoined: Date,
    isBlock: boolean,
    preferenceNotification?: string,
    lastLogin?: Date,
    userAppId?: string,
    referralCode?: string,
    referralLink?: string,
    access?: string,
    refresh?: string,
    id?: string,
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phoneIndicative = phoneIndicative;
    this.phone = phone;
    this.dateJoined = dateJoined;
    this.isBlock = isBlock;
    this.preferenceNotification = preferenceNotification;
    this.lastLogin = lastLogin;
    this.userAppId = userAppId;
    this.referralCode = referralCode;
    this.referralLink = referralLink;
    access = access;
    refresh = refresh;
    this.id = id;
  }

  *[Symbol.iterator]() {
    yield this.id;
    yield this.firstname;
    yield this.lastname;
    yield this.email;
    yield this.phoneIndicative;
    yield this.phone;
    yield this.dateJoined;
    yield this.isBlock;
    yield this.preferenceNotification;
    yield this.lastLogin;
    yield this.userAppId;
    yield this.referralCode;
    yield this.referralLink;
  }

  static fromJson(json: UserJson): User {
    return new User(
      json.firstname,
      json.lastname,
      json.email,
      json.phone_indicative,
      json.phone,
      new Date(json.date_joined),
      json.is_block,
      json.preference_notification,
      json.last_login != null ? new Date(json.last_login!) : undefined,
      json.user_app_id,
      json.referral_code,
      json.referral_link,
      json.access,
      json.refresh,

      json.id,
    );
  }

  toJson(): UserJson {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      phone_indicative: this.phoneIndicative,
      phone: this.phone,
      date_joined: this.dateJoined.toISOString(),
      is_block: this.isBlock,
      preference_notification: this.preferenceNotification,
      last_login:
        this.lastLogin != null ? this.lastLogin.toISOString() : undefined,
      user_app_id: this.userAppId,
      referral_link: this.referralLink,
    };
  }
}

export default User;
