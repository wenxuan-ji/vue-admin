<template>
	<div id="login">
		<div class="login-warp">
			<ul class="menu-tab">
				<li :class="{'current':item.current}" v-for="item in menuTab" :key="item.id" @click='tiggerMenu(item)'>{{ item.txt }}</li>
			</ul>
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form" size="medium">
				<el-form-item prop="username">
					<label for="username">邮箱</label>
					<el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<label for="password">密码</label>
					<el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" maxlength="20" minlength="6"></el-input>
				</el-form-item>
				<el-form-item prop="passwords" v-if="model==='register'">
					<label for="passwords">重复密码</label>
					<el-input id="passwords" type="password" v-model="ruleForm.passwords" autocomplete="off" maxlength="20" minlength="6"></el-input>
				</el-form-item>
				<el-form-item prop="code">
					<label for="code">验证码</label>
					<el-row :gutter="11">
						<el-col :span="15">
							<el-input id="code" v-model.number="ruleForm.code" maxlength="6" minlength="6"></el-input>
						</el-col>
						<el-col :span="9">
							<el-button type="success" class="block" @click="getSms()">获取验证码</el-button>
						</el-col>
					</el-row>
					
				</el-form-item>
				<el-form-item>
					<el-button type="warning" @click="submitForm('ruleForm')" class="login-btn block" :disabled='loginButtonStatus'>{{ model === 'login' ? '登录' : '注册'}}</el-button>
					<!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import { GetSms,Login } from "@/api/login";
import { reactive, ref, isRef, toRefs, onMounted } from '@vue/composition-api';
import { stripscripts, checkEmail, checkPassword, checkCode } from '@/utils/validate';
export default{
	name:'login',
	// setup(prpos,context){
	setup(prpos, { refs, root }){
		//这里放data 的数据、生命周期、自定义函数
		let validataUsername = (rule, value, callback) => {
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
		let validataPassword = (rule, value, callback) => {
			ruleForm.password = stripscripts(value);  //过滤特殊字符
			value = ruleForm.password;
			if (value === '') {
				callback(new Error('请输入密码'));
			} else if (!checkPassword(value)) {
				callback(new Error('密码格式不对，只能输入6-20位数字'));
			} else {
				callback();
			}
		};
		let validataPasswords = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value != ruleForm.password) {
				callback(new Error('两次密码输入不一致'));
			} else {
				callback();
			}
		};
		let validataCode = (rule, value, callback) => {
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
		/**
		 * 声明数据
		 */
		//声明对象
		const menuTab = reactive([
			{ txt:'登录',current:true, type:'login'},
			{ txt:'注册',current:false, type:'register'}
		])

		//模块值 声明基础数据类型的时候使用
		const model = ref('login')
		// console.log(model.value)

		//登录按钮禁用
		const loginButtonStatus = ref(true);

		const ruleForm = reactive({
			username: '',
			password: '',
			passwords: '',
			code: ''
		})
		
		const rules = reactive({
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
		})

		//isRef  检查一个对象是否是ref对象
		// console.log(isRef(model) ? true : false);
		/*
		 toRefs 将reactive对象转换为普通对象，保证对象解构或拓展运算符不会丢失原有响应式对象的相应
		例如：
		const obj = reactive(
			{ x:'1',y:'2'}
		)
		console.log(obj.x)
		const aa = toRefs(obj);  //转换为普通对象
		console.log(aa.x.value)
		*/

		/**
		 * 生命周期
		 */
		//挂在完成后执行
		onMounted(()=>{
			// GetSms();
		})
		/**
		 * 声明函数
		 */
		const tiggerMenu = ((data) =>{
			model.value = data.type;
			menuTab.forEach((elem, index)=>{
				elem.current = false
			})
			data.current = true;
		})
		/**
		 * 获取验证码
		 */
		const getSms = (()=> {
			if (ruleForm.username == '') {
				root.$message.error('邮箱不能为空');
				return false;
			}
			if (!checkEmail(ruleForm.username)) {
				root.$message.error('用户名格式错误');
				return false;
			}
			// if (ruleForm.password == '') {
			// 	root.$message.error('密码不能为空');
			// 	return false;
			// }
			let requestData = {
				username:ruleForm.username, 
				module: 'login'
			};
			GetSms(requestData).then(response => {
				console.log('2222')
				console.log(response)
			}).catch(error=>{
				console.log('1111')
				console.log(error)
			})
		})
		/**
		 * 提交表单
		 */
		const submitForm = ((formName)=>{
			axios.post('/user', {
					firstName: 'Fred',
					lastName: 'Flintstone'
				})
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});


			refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		})
		return {
			menuTab, model, tiggerMenu, submitForm, ruleForm, rules, getSms, loginButtonStatus
		}
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