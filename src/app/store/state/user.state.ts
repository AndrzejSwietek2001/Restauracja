import {UserModel} from "../models/user.model";
import {Selector, State, StateContext, Action} from "@ngxs/store";
import {LoginUser, LogoutUser} from "../actions/user.action";
import {ProductStateModel} from "./product.state";

export class UserStateModel {
  user: UserModel;
}
const emptyUser: UserModel = {
  email: "", lastname: "", name: "", password: "", role: [], token: "", banned: false
}
@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: null
  }
})
export class UserState {
  @Selector()
  static getUser(state: UserStateModel) {
    return state.user;
  }
  @Action(LoginUser)
  login({getState, patchState}: StateContext<UserStateModel>, { payload }: LoginUser){
    const state = getState();
    patchState({
      user: payload
    })
  }

  @Action(LogoutUser)
  remove({getState, patchState}: StateContext<UserStateModel>, { payload }: LogoutUser){
    patchState({
      user: null
    })
  }
}
