import { type AddAccountModel } from '../../../../domain/usercases/add-account'
import { type AccountModel } from '../../../../domain/models/account'

export interface AddAccountRepository {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
