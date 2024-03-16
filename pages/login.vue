<template>
  <div id="LoginPopup">
    <div class="popup-wrp">
      <section class="popup-top">
        <div class="close-btn" @click="common.goHome()">
          <img src="@/assets/img/common/close-btn.png" alt="" />
        </div>
      </section>
      <section class="popup-middle">
        <div class="top">
          <div>
            <img src="@/assets/img/common/whynot-here-logo.png" alt="" />
          </div>
          <div>한동대학교 모임의 시작!</div>
          <div>원활한 서비스 이용을 위해 로그인을 해주세요.</div>
        </div>
        <div class="middle">
          <div v-if="isIdPwLoginMode">
            <div class="form-title">이메일 주소</div>
            <div>
              <input
                v-model="email"
                class="form-content"
                type="text"
                placeholder="ex) whynot@gmail.com"
              />
            </div>
            <div class="form-title">비밀번호</div>
            <div>
              <input
                v-model="password"
                class="form-content"
                type="password"
                placeholder="비밀번호를 입력해주세요."
              />
            </div>
          </div>
          <div v-else style="height: 160px"></div>
          <div class="login-btn-wrp" @click="idPwLogin()">
            <div class="login-btn">
              <div v-if="!isIdPwLoginMode" class="login-icon">
                <img src="@/assets/img/login/login-icon.png" alt="" />
              </div>
              <div>
                {{ isIdPwLoginMode ? '로그인' : '일반 로그인' }}
              </div>
            </div>
          </div>
        </div>
        <div class="social-login">
          <div v-if="common.isFromPc" class="social-login-btn">
            <img
              src="@/assets/img/login/google-login-btn.png"
              alt=""
              @click="googleLogin()"
            />
          </div>
          <div class="social-login-btn">
            <img
              src="@/assets/img/login/kakao-login-btn.png"
              alt=""
              @click="kakaoLogin()"
            />
          </div>
          <div class="social-login-btn">
            <img
              src="@/assets/img/login/naver-login-btn.png"
              alt=""
              @click="naverLogin()"
            />
          </div>
          <div v-if="!common.isFromPc" class="social-login-btn">
            <img
              src="@/assets/img/login/apple-login-btn.png"
              alt=""
              @click="appleLogin()"
            />
          </div>
        </div>
      </section>
      <section class="popup-bottom">
        로그인은
        <strong @click="openPopup(1)"
          >개인 정보 보호 정책 및 서비스 약관에 동의</strong
        >하는 것을 의미하며, 서비스 이용을 위해서 이메일과, 이름, 프로필
        이미지를 수집합니다.
      </section>
    </div>
    <CommonPolicyPopup ref="policyPopup" :type="openPopupType" />
  </div>
</template>

<script lang="ts" setup>
import { mainCommon } from '~/composables/main';
import { useUserFecth } from '~/fetch/useUserFetch';
import { useAuthStore } from "~/store/auth";

/*
 * data
 */
const isIdPwLoginMode: Ref<boolean> = ref(true);
const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const openPopupType: Ref<number> = ref(1);
const policyPopup: Ref<any> = ref(null);
const frontUrl = useRuntimeConfig().public.frontUrl;
const apiUrl = useRuntimeConfig().public.apiUrl;
const { formLogin } = useUserFecth();
const common = mainCommon();
const { setUserInfo } = useAuthStore();
/*
 * props
 */

/*
 * emit / computed
 */
const emit = defineEmits([
  "templateEmits"
])
// const tempComputed = computed<any>(() => {
// })

/*
 * mounted
 */

/*
 * function
 */
function openPopup(type: number) {
  policyPopup.value.show()
  openPopupType.value = type
}

function appleLogin() {
  location.href = `${apiUrl}/auth/login/apple?redirect_uri=${frontUrl}`
}

function googleLogin() {
  location.href = `${apiUrl}/auth/login/google?redirect_uri=${frontUrl}`
}

function kakaoLogin() {
  location.href = `${apiUrl}/auth/login/kakao?redirect_uri=${frontUrl}`
}

function naverLogin() {
  location.href = `${apiUrl}/auth/login/naver?redirect_uri=${frontUrl}`
}

function idPwLogin() {
  if (isIdPwLoginMode.value) {
    // 일반 로그인
    formLogin(email.value, password.value).then((result: any) => {
      common.setCookie('token', result.accessToken, 8760);
      common.goHome();
    }).catch((error: any) => {
      console.log(error);
    })
  } else {
    isIdPwLoginMode.value = true;
  }
}

</script>
<style lang="scss" scoped>
@import '@/assets/css/util.scss';

#LoginPopup::-webkit-scrollbar {
  display: none;
}
#LoginPopup {
  overflow-y: scroll;

  @include mobile {
    z-index: 100;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: #ffffff;
    .popup-top {
      .close-btn {
        margin-top: 40px;
        margin-right: 20px;
        text-align: right;
        cursor: pointer;
        img {
          width: 24px;
          height: 24px;
        }
      }
    }
    .popup-middle {
      .top {
        width: 327px;
        margin: 0px auto 32px auto;
        div:first-child {
          margin-top: 20px;
          // margin-left: 30px;
          img {
            width: 112px;
            height: 26px;
          }
        }
        div:nth-child(2) {
          margin-top: 32px;
          // margin-left: 32px;
          font-size: 1.5rem;
          font-weight: 600;
          color: #14428d;
        }
        div:nth-child(3) {
          margin-top: 10px;
          // margin-left: 32px;
          font-size: 0.88rem;
          color: #0c2958;
        }
      }
      .middle {
        width: 327px;
        margin: 54px auto 32px auto;
        border-bottom: 1px solid rgba(235, 238, 241, 0.919);
        .form-title {
          font-size: 0.88rem;
          font-weight: 500;
        }
        .form-content {
          width: 327px;
          height: 48px;
          font-size: 1rem;
          border: none;
          border-bottom: 1px solid #e7e7e7;
          margin-bottom: 12px;
        }
        .form-content:focus {
          outline: none;
          border-bottom: 1px solid #296cdb;
        }
        .login-btn-wrp {
          width: 327px;
          height: 50px;
          line-height: 50px;
          margin: 16px auto 32px auto;
          border-radius: 8px;
          background: #296cdb;
          .login-btn {
            display: flex;
            width: max-content;
            margin: 0 auto;
            font-size: 1rem;
            font-weight: 600;
            color: #fff;
            text-align: center;
            .login-icon {
              margin-right: 10px;
              padding-top: 3px;
              img {
                width: 18px;
                height: 20px;
              }
            }
          }
        }
      }
      .social-login {
        display: flex;
        gap: 30px;
        width: max-content;
        margin: 0 auto;
        .social-login-btn {
          margin-bottom: 15px;
          cursor: pointer;
          img {
            width: 48px;
            height: 48px;
          }
          img:hover {
            box-shadow: 0px 0px 4px rgba(30, 30, 30, 0.04),
              0px 4px 8px rgba(30, 30, 30, 0.04);
            border-radius: 12px;
          }
        }
      }
    }
    .popup-bottom {
      width: 274px;
      line-height: 1.2rem;
      margin: 0 auto;
      padding-top: 32px;
      padding-bottom: 29px;
      font-size: 0.75rem;
      font-weight: 400;
      color: #7a7a7a;
      text-align: center;
      word-break: keep-all;
      strong {
        text-decoration: underline;
        font-weight: 400;
        cursor: pointer;
      }
    }
  }
  @include min-desktop {
    z-index: 100;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: #ffffff;
    .popup-top {
      .close-btn {
        margin-top: 40px;
        margin-right: 20px;
        text-align: right;
        cursor: pointer;
        img {
          width: 24px;
          height: 24px;
        }
      }
    }
    .popup-middle {
      .top {
        width: 327px;
        margin: 0px auto 32px auto;
        div:first-child {
          margin-top: 150px;
          // margin-left: 30px;
          img {
            width: 112px;
            height: 26px;
          }
        }
        div:nth-child(2) {
          margin-top: 32px;
          // margin-left: 32px;
          font-size: 1.5rem;
          font-weight: 600;
          color: #14428d;
        }
        div:nth-child(3) {
          margin-top: 10px;
          // margin-left: 32px;
          font-size: 0.88rem;
          color: #0c2958;
        }
      }
      .middle {
        width: 327px;
        margin: 54px auto 32px auto;
        border-bottom: 1px solid rgba(235, 238, 241, 0.919);
        .form-title {
          font-size: 0.88rem;
          font-weight: 500;
        }
        .form-content {
          width: 327px;
          height: 48px;
          font-size: 1rem;
          border: none;
          border-bottom: 1px solid #e7e7e7;
          margin-bottom: 12px;
        }
        .form-content:focus {
          outline: none;
          border-bottom: 1px solid #296cdb;
        }
        .login-btn-wrp {
          width: 327px;
          height: 50px;
          line-height: 50px;
          margin: 16px auto 32px auto;
          border-radius: 8px;
          background: #296cdb;
          .login-btn {
            display: flex;
            width: max-content;
            margin: 0 auto;
            font-size: 1rem;
            font-weight: 600;
            color: #fff;
            text-align: center;
            .login-icon {
              margin-right: 10px;
              padding-top: 3px;
              img {
                width: 18px;
                height: 20px;
              }
            }
          }
        }
      }
      .social-login {
        display: flex;
        gap: 30px;
        width: max-content;
        margin: 0 auto;
        .social-login-btn {
          margin-bottom: 15px;
          cursor: pointer;
          img {
            width: 48px;
            height: 48px;
          }
          img:hover {
            box-shadow: 0px 0px 4px rgba(30, 30, 30, 0.04),
              0px 4px 8px rgba(30, 30, 30, 0.04);
            border-radius: 12px;
          }
        }
      }
    }
    .popup-bottom {
      width: 274px;
      line-height: 1.2rem;
      margin: 0 auto;
      padding-top: 32px;
      padding-bottom: 29px;
      font-size: 0.75rem;
      font-weight: 400;
      color: #7a7a7a;
      text-align: center;
      word-break: keep-all;
      strong {
        text-decoration: underline;
        font-weight: 400;
        cursor: pointer;
      }
    }
  }
}

</style>
