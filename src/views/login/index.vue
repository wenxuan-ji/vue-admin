<template>
	<div id="login">
		<div class="login-warp">
			<ul class="menu-tab">
				<li :class="{'current':item.current}" v-for="item in menuTab" :key="item.id" @click='tiggerMenu(item)'>{{ item.txt }}</li>
			</ul>
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form" size="medium">
				<el-form-item prop="username">
					<label>邮箱</label>
					<el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<label>密码</label>
					<el-input type="password" v-model="ruleForm.password" autocomplete="off" maxlength="20" minlength="6"></el-input>
				</el-form-item>
				<el-form-item prop="passwords" v-if="model==='register'">
					<label>重复密码</label>
					<el-input type="password" v-model="ruleForm.passwords" autocomplete="off" maxlength="20" minlength="6"></el-input>
				</el-form-item>
				<el-form-item prop="code">
					<label>验证码</label>
					<el-row :gutter="11">
						<el-col :span="15">
							<el-input v-model.number="ruleForm.code" maxlength="6" minlength="6"></el-input>
						</el-col>
						<el-col :span="9">
							<el-button type="success" class="block">获取验证码</el-button>
						</el-col>
					</el-row>
					
				</el-form-item>
				<el-form-item>
					<el-button type="warning" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
					<!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import { stripscripts,checkEmail,checkPassword,checkCode } from '@/utils/validate';
export default{
	name:'login',
	data(){
		var validataUsername = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入用户名'));
			} else if(!checkEmail(value)){
				callback(new Error('用户名格式错误'));
			}else {
				// if (this.ruleForm.checkPass !== '') {
				// 	this.$refs.ruleForm.validateField('checkPass');
				// }
				callback();
			}
		};
		var validataPassword = (rule, value, callback) => {
			this.ruleForm.password = stripscripts(value);  //过滤特殊字符
			value = this.ruleForm.password;
			if (value === '') {
				callback(new Error('请输入密码'));
			} else if (!checkPassword(value)) {
				callback(new Error('密码格式不对，只能输入6-20位数字'));
			} else {
				callback();
			}
		};
		var validataPasswords = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value != this.ruleForm.password) {
				callback(new Error('两次密码输入不一致'));
			} else {
				callback();
			}
		};
		var validataCode = (rule, value, callback) => {
			if (value === '') {
				return callback(new Error('请输入验证码'));
			} else if (!checkCode(value)){
				return callback(new Error('验证码格式错误'));
			} else {
				callback();
			}
        	// setTimeout(() => {
			// 	if (!Number.isInteger(value)) {
			// 		callback(new Error('请输入数字值'));
			// 	} else {
			// 		if (value < 18) {
			// 		callback(new Error('必须年满18岁'));
			// 		} else {
			// 		callback();
			// 		}
			// 	}
			// }, 1000);
		};
		return {
			menuTab: [
				{ txt:'登录',current:true, type:'login'},
				{ txt:'注册',current:false, type:'register'}
			],
			model:'login',
			ruleForm: {
				username: '',
				password: '',
				passwords: '',
				code: ''
			},
			rules: {
				username: [
					{ validator: validataUsername, trigger: 'blur' }
				],
				password: [
					{ validator: validataPassword, trigger: 'blur' }
				],
				passwords: [
					{ validator: validataPasswords, trigger: 'blur' }
				],
				code: [
					{ validator: validataCode, trigger: 'blur' }
				]
			}
		}
	},
	//挂载完成后自动执行
	mounted(){
		// console.log(11)
	}
	,
	methods:{
		tiggerMenu(data){
			this.model = data.type;
			this.menuTab.forEach((elem, index)=>{
				elem.current = false
			})
			data.current = true;
		},
		submitForm(formName) {
        this.$refs[formName].validate((valid) => {
			if (valid) {
				alert('submit!');
			} else {
				console.log('error submit!!');
				return false;
			}
        });
		}
		// ,
		// resetForm(formName) {
		// 	this.$refs[formName].resetFields();
		// }
	}
}

</script>
<style lang="scss" scoped>
#login {
	background-color: #344a5f;
	height:100vh;
}
.login-warp {
	width:330px;
	margin: auto;
}
.menu-tab {
	margin-top: 0px;
	text-align: center;
	li {
		display: inline-block;
		width:88px;
		line-height: 36px;
		font-size: 14px;
		border-radius: 2px;
		color:#fff;
		cursor:pointer;
	}
}
.current {
	background-color: rgba(0, 0, 0, .1);
}
.login-form {
	margin-top: 29px;
	label{
		display:block;
		font-size:14px;
		color:#fff;
		margin-bottom: 3px;
	}
	.block {
		display:block;
		width:100%;
	}
	.login-btn{
		margin-top: 19px;
	}
}
</style>