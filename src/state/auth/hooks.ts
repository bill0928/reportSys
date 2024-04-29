import { useCallback, useEffect, useState } from "react";
// import useSWRMutation from 'swr/mutation'
import type { Auth } from "./types";
import { useAuthState } from "./store";
import credentialCookie from "./cookie";
import { useFetcher } from "@/state/swrHooks";
import { UserInfo, TwoFA, AuthInfo } from "./types";
import { loginHandel, logoutHandel, twofaHandel } from "./api";
import { checkLogin } from "./util";
import { LOGIN_STATUS } from "../constant";
import api from "@/state/api";
import useSWRMutation from "swr/mutation";

export const useAuth = () => {
  const [authState, setAuthState] = useAuthState();

  const login = useCallback(
    async (authData: Auth) => {
      const res = await loginHandel(authData);
      // if ("error" in res) return res;
      // setAuthState({
      //   credential: res,
      //   tokenLoading: false,
      // });
      // return res;
    },
    [setAuthState]
  );
  const loginGG = useCallback(
    async () => {
      const res ={  id: 87, username: 'abc'}
      credentialCookie.set(res)
      setAuthState({
        credential: res,
        tokenLoading: false,
      });
      return res;
    },
    []
  );

  const logout = useCallback(() => {
    logoutHandel();
    setAuthState({ credential: undefined, tokenLoading: false });
  }, [setAuthState]);

  return {
    login: loginGG,
    logout,
    credential: authState.credential,
    isLogin: !!authState.credential,
    loading: authState.tokenLoading,
    isLegal: !!authState.credential && checkLogin() === LOGIN_STATUS.LOGIN,
  };
};

/** 先不控管，直接覆盖auth资讯 */
export const useUserProfile = () => {
  const [url, set] = useState("");
  const { credential } = useAuth();

  useEffect(() => {
    if (credential) {
      // const { twofa } = credential;
      // if (twofa !== "challenging") {
      //   set("/user/self");
      // }
    }
  }, [credential]);

  const { data, mutate, error } = useFetcher<UserInfo>(url);
  return { data, mutate, error };
};

