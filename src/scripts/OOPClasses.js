//Tasks


//T1 Создайте класс Goods. Класс должен содержать свойства name, amount. Создайте на его основе объект goods. Выведите в консоль созданный объект. Помните, все классы - в отдельных файлах. Имена классов с большой буквы.
class Goods {
    constructor(name, amount, image, count) {
        this.name = name;
        this.amount = amount;
        this.image = image;          //T2
        this.count = count;          //T2 Добавьте в класс Goods свойства image и count - картинка и количество на складе.
    }

    draw() {
        let div = document.createElement('div');              //T3
        div.classList.add('smallScreenContainer');
        let nameElem = document.createElement('p');          //  Добавьте в класс Goods метод draw, который будет выводить div с изображением, названием товара, ценой - в указанный элемент (дозапись).
        nameElem.innerHTML = this.name;
        let amountOfElem = document.createElement('p');
        amountOfElem.innerHTML = this.amount;
        let imageElem = document.createElement('img');
        imageElem.src = this.image;
        let countElem = document.createElement('p');
        countElem.innerHTML = this.count;

        div.append(nameElem);
        div.append(amountOfElem);
        div.append(imageElem);
        div.append(countElem);

        return div;
    }
}

let goods = new Goods();
console.log(goods);

let goods2 = new Goods('BoyNextDoor',2,'https://i.ytimg.com/vi/_aLJGHiTSUM/maxresdefault.jpg',300+'$'); //T4 Создайте на основе класса Goods объект goods2, заполните свойства, примените метод draw для вывода товара на страницу в блок out-4.
document.querySelector('.outOOP4').append(goods2.draw());
console.log(goods2);

class Goods2 extends Goods {                                          //T5 Создайте класс Goods2, который наследуется от Goods. Добавьте ему свойство sale равное true или false. Перезапишите метод draw так, чтобы он выводил информацию о распродажах.
    constructor(name, amount, image, count, sale) {
        super(name, amount, image, count);
        this.sale = sale;
    }
    draw() {
        let div = super.draw();
        if (this.sale){
            let saleElem = document.createElement('p')
            saleElem.innerHTML = 'распродажа';
            div.append(saleElem);
        }
        return div;
    }
}


let goods3 = new Goods2('BoyNextDoor',2,'https://i.ytimg.com/vi/_aLJGHiTSUM/maxresdefault.jpg',300+'$', true);        //T6 Создайте на основе класса Goods2 объект goods3. Заполните все поля. Выведите товар на страницу с помощью метода draw. Вывод осуществить в out-6.


//T7 Создайте класс Valid, который содержит свойства email, password, isValid. И метод validate. Метод validate должен проверять длину пароля и писать false в isValid если длина меньше 6 и true если больше. Изначально свойство isValid равно false.
class Valid {
    constructor(email, password, isValid) {
        this.email = email;
        this.password = password;
        this.isValid = false;
    }
    validate(){
        this.isValid = this.password.length >= 6;
        return this.isValid;
    }
}
let userDataW = new Valid('kiseldimon@mail.ru','123qw'); //T8 Создайте объект на основе класса Valid и задайте ему имя и пароль длиной 5 символов. Запустите метод validate() и выведите в консоль свойство isValid.
userDataW.validate();
console.log(userDataW.validate());

let userDataR = new Valid('kiseldimon@mail.ru','12345qwe'); //T9 Создайте объект на основе класса Valid и задайте ему имя и пароль длиной 7 символов. Запустите метод validate() и выведите в консоль свойство isValid.
userDataR.validate();
console.log(userDataR.validate());

//T10 Унаследуйтесь от класса Valid и создайте класс Valid2. Расширьте его свойствами emaiError, passwordError. По умолчанию, они равны пустой строке. Перезапишите метод validate(), помимо проверки пароля, он должен содержать еще проверку свойства email на пустоту. Если поле email пустое - то isValid - false. Также, в случае ошибки валидации в поле emailError пишется сообщение ‘email empty’, в поле passwordError - ‘min length 6’.
class Valid2 extends Valid {
    constructor(email, password, isValid, emailError, passwordError) {
        super(email, password, isValid);
        this.emailError = '';
        this.passwordError = '';
    }
    validate() {
        let parentValidate = super.validate();
        if (this.email === '') {
            this.isValid = false;
            this.emailError = 'email empty';
        }
        else{
            this.isValid = true;
        }
        if (parentValidate === false) {
            this.passwordError = 'min length 6';
        }
        return this.isValid;

    }
}

let valid2 = new Valid2('','123qw'); //Т11 Создайте на основе класса Valid2 объект valid2 и задайте пустой емейл и длину пароля меньше 7. Запустите метод validate(). Выведите объект в консоль.
valid2.validate();
console.log(valid2);



let valid3 = new Valid2('kiseldimon@mail.ru','12345qwerty');  //Т12 Создайте на основе класса Valid2 объект valid3 и задайте не пустой емейл и длину пароля больше 7. Запустите метод validate(). Выведите объект в консоль.
valid3.validate();
console.log(valid3);
