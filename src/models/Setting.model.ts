import { SettingJson } from "@/interfaces/setting.interface";

class Setting {
  id: string | null;
  minimumDeposit: string | null;
  minimumWithdrawal: string | null;
  bonusPercent: string | null;
  moovPassword: string | null;
  mtnPassword: string | null;
  sbinPassword: string | null;
  cardPassword: string | null;
  mtnUrl: string | null;
  moovUrl: string | null;
  cardUrl: string | null;
  sbinUrl: string | null;
  hash: string | null;
  cashDeskId: string | null;
  cashierPass: string | null;
  moovCustomer: string | null;
  mtnCustomer: string | null;
  cardCustomer: string | null;
  sbinCustomer: string | null;

  constructor(
    minimumDeposit: string | null,
    minimumWithdrawal: string | null,
    bonusPercent: string | null,
    moovPassword: string | null,
    mtnPassword: string | null,
    sbinPassword: string | null,
    cardPassword: string | null,
    mtnUrl: string | null,
    moovUrl: string | null,
    cardUrl: string | null,
    sbinUrl: string | null,
    hash: string | null,
    cashDeskId: string | null,
    cashierPass: string | null,
    moovCustomer: string | null,
    mtnCustomer: string | null,
    cardCustomer: string | null,
    sbinCustomer: string | null,
    id: string | null,
  ) {
    this.minimumDeposit = minimumDeposit;
    this.minimumWithdrawal = minimumWithdrawal;
    this.bonusPercent = bonusPercent;
    this.moovPassword = moovPassword;
    this.mtnPassword = mtnPassword;
    this.sbinPassword = sbinPassword;
    this.cardPassword = cardPassword;
    this.mtnUrl = mtnUrl;
    this.moovUrl = moovUrl;
    this.cardUrl = cardUrl;
    this.sbinUrl = sbinUrl;
    this.hash = hash;
    this.cashDeskId = cashDeskId;
    this.cashierPass = cashierPass;
    this.moovCustomer = moovCustomer;
    this.mtnCustomer = mtnCustomer;
    this.cardCustomer = cardCustomer;
    this.sbinCustomer = sbinCustomer;
    this.id = id;
  }

  static fromJson(json: SettingJson): Setting {
    return new Setting(
      json.minimum_deposit,
      json.minimum_withdrawal,
      json.bonus_percent,
      json.moov_password,
      json.mtn_password,
      json.sbin_password,
      json.card_password,
      json.mtn_url,
      json.moov_url,
      json.card_url,
      json.sbin_url,
      json.hash,
      json.cash_desk_id,
      json.cashierpass,
      json.moov_customer,
      json.mtn_customer,
      json.card_customer,
      json.sbin_customer,
      json.id,
    );
  }

  toJson(): SettingJson {
    return {
      minimum_deposit: this.minimumDeposit,
      minimum_withdrawal: this.minimumWithdrawal,
      bonus_percent: this.bonusPercent,
      moov_password: this.moovPassword,
      mtn_password: this.mtnPassword,
      sbin_password: this.sbinPassword,
      card_password: this.cardPassword,
      mtn_url: this.mtnUrl,
      moov_url: this.moovUrl,
      card_url: this.cardUrl,
      sbin_url: this.sbinUrl,
      hash: this.hash,
      cash_desk_id: this.cashDeskId,
      cashierpass: this.cashierPass,
      moov_customer: this.moovCustomer,
      mtn_customer: this.mtnCustomer,
      card_customer: this.cardCustomer,
      sbin_customer: this.sbinCustomer,
      id: this.id,
    };
  }
}

export default Setting;