import "./styleSignIn.css";
let inputMain = document.querySelector('.input_main') as HTMLDivElement
let inputSignUp = document.querySelector(".input_sign_up") as HTMLDivElement;
let signIn = document.querySelector(".sign_in_block") as HTMLDivElement;
let column = document.querySelector(".column") as HTMLDivElement;
let error = document.querySelector(".error") as HTMLParagraphElement;
let storedData = localStorage.getItem("userDataArray");
let userDataArray: Array<any> = storedData ? JSON.parse(storedData) : [];
column.addEventListener("click", event => {
  let target = event.target as HTMLElement;
  if (
    target.classList.contains("register") &&
    !signIn.classList.contains("active")
  ) {
    inputSignUp.classList.toggle("active");
  }
});
column.addEventListener("click", event => {
  let target = event.target as HTMLElement;
  if (
    target.classList.contains("sign_in_2") &&
    !inputSignUp.classList.contains("active")
  ) {
    signIn.classList.toggle("active");
  }
});
inputMain.addEventListener("submit", event => {
  let target = event.target as HTMLFormElement;
  if (target.classList.contains("form")) {
    event.preventDefault();

    const fullNameInput = target.querySelector(
      '.input[name="fullName"]'
    ) as HTMLInputElement;
    const emailInput = target.querySelector(
      '.input[name="email"]'
    ) as HTMLInputElement;
    const passwordInput = target.querySelector(
      '.input[name="password"]'
    ) as HTMLInputElement;
    const userExists = userDataArray.some(
      user =>
        user.email === emailInput.value || user.password === passwordInput.value
    );
    if (userExists) {
      error.classList.add("error_show");
    } else if (
      fullNameInput.value == "" ||
      emailInput.value == "" ||
      passwordInput.value == ""
    ) {
      error.textContent = "Заполните все поля";
      error.classList.add("error_show");
    } else {
      error.classList.remove("error_show");
      function generateUniqueId() {
        return Math.random().toString(36).substr(2, 9);
    }
    let userId = generateUniqueId()
      const userData = {
        fullName: fullNameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        profileData: {}
      };
      localStorage.setItem(`user_${userId}`, JSON.stringify(userData))

      userDataArray.push(userData);
      localStorage.setItem("userDataArray", JSON.stringify(userDataArray));
      target.reset();
      console.log("Пользователь зарегистрирован:", userData);
      console.log("Массив пользователей:", userDataArray);
    }
  }
});

// Sign in part
let isLogin = false;
let btnSignIn = document.querySelector('.sign_in_button') as HTMLButtonElement
let checkName = document.querySelector('.input_2[name="full_Name"]') as HTMLInputElement
let checkPassword = document.querySelector('.input_2[name="Pass"]') as HTMLInputElement
let error_2 = document.querySelector('.error_2') as HTMLParagraphElement
console.log(userDataArray)



btnSignIn.addEventListener("click", () => {
	// ЧТО ТО Не получилось и у меня сгорело
	// let userInfo = userDataArray.find((el)=>el.fullName === checkName.value && el.password === checkPassword.value
	if(userDataArray.find((el)=>el.fullName === checkName.value && el.password === checkPassword.value)){
		isLogin = true
		console.log(userDataArray)
		console.log('win')
		if(error_2.classList.contains('error_show_2')){
			error_2.classList.remove('error_show_2')
		}
		buttonNav.style.display = 'none';
		signIn.classList.remove('active');
    if(isLogin){
      btnSignIn.style.display = 'none'
      error_2.textContent = 'Вы успешно вошли в аккаунт'
      error_2.classList.add('error_show_2')
      error_2.style.color = 'green'
      error_2.style.fontSize = '16px'
    }
	}
	else{
		error_2.classList.add('error_show_2')
		isLogin = false
		console.log(false)
	}
});
console.log(userDataArray)
let buttonNav = document.querySelector('.sign_in') as HTMLButtonElement
isLogin




