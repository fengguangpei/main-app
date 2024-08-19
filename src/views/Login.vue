<template>
  <div class="login">
    <div class="form">
      <div class="form-inner">
        <img src="../assets/images/login.png" alt="" />
        <span class="tip1">登录</span>
        <span class="tip2">欢迎登录OA办公后台管理系统</span>
        <el-form :model="formData" :rules="formRules" ref="formInstance">
          <el-form-item prop="account">
            <el-input
              v-model="formData.account"
              placeholder="请输入手机号/工号"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" clearable></el-input>
          </el-form-item>
        </el-form>
        <div class="policy">
          <el-checkbox v-model="formData.policy"></el-checkbox>
          我已阅读并同意
          <span>《用户隐私政策》</span>
        </div>
        <el-button type="success" @click="login">登 录</el-button>
        <div class="tip3">忘记密码请联系管理员</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
const formData = reactive({
  account: '',
  password: '',
  policy: true
})
const formRules = {
  account: [
    {
      validator(rule, value, callback) {
        value ? callback() : callback('请输入手机号或工号')
      }
    }
  ],
  password: [
    {
      validator(rule, value, callback) {
        value ? callback() : callback('请输入密码')
      }
    }
  ]
}
const formInstance = ref()
const formValidate = () => {
  return new Promise((resolve) => {
    formInstance.value.validate((bool) => resolve(bool))
  })
}
const login = async () => {
  const bool = await formValidate()
  if (bool) {
    // 进入首页
  } else {
    ElMessage({
      type: 'warning',
      message: '请输入手机号/工号/密码'
    })
  }
}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  background-image: url('../assets/images/login.png');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .form {
    width: 440px;
    height: 600px;
    background-color: #fff;
    border-radius: 16px;
    display: flex;
    justify-content: center;

    &-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 335px;

      img {
        margin-top: 40px;
        width: 88px;
        height: 88px;
      }

      .tip1 {
        font-size: 30px;
        font-weight: 500px;
      }

      .tip2 {
        font-size: 16px;
        color: #999;
        margin-top: 4px;
      }

      :deep(.el-form) {
        width: 335px;
        margin-top: 40px;
        margin-bottom: 10px;

        .el-input__inner {
          height: 40px;
        }
      }

      :deep(.policy) {
        width: 100%;
        display: flex;
        align-items: center;
        color: #c9c9c9;
        font-size: 14px;

        .el-checkbox {
          height: 14px;
          margin-right: 4px;
        }

        & > span {
          color: rgb(37 97 239 / 100%);
        }
      }

      .el-button {
        width: 100%;
        margin-top: 10px;
        height: 44px;
        background-color: rgb(37 97 239 / 100%);
      }

      .tip3 {
        color: #c9c9c9;
        font-size: 14px;
        margin-top: 10px;
      }
    }
  }
}
</style>
