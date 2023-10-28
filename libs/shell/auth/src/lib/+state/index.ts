import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthData} from "./auth.reducer";

export const getAuthState = createFeatureSelector<AuthData>("auth");
export const getAccount = createSelector(getAuthState, (state) => state.account);
export const getLoginError = createSelector(getAuthState, (state) => state.error);

export const getLoadingState = createSelector(getAuthState, (state) => state.loading);
