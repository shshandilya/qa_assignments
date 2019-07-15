//import { ExpectedConditions } from "protractor";

//import { ExpectedConditions } from "protractor";

//import { ExpectedConditions } from "protractor";

//import { Ptor } from "protractor";

//import { format } from "url";
//import { element, ExpectedConditions } from "protractor";

 // describe block is test suits 
 describe('Banking App Test Suite', function(){

    var selectOptionByText = function(text) {
        return element(by.cssContainingText('option', text)).click();
    };

    var testCurrency = function(currency){
        browser.get('http://www.way2automation.com/angularjs-protractor/banking/#/login');
        browser.manage().window().maximize();
        //element(by.model('yourName')).sendKeys('Shan');
        element(by.buttonText('Bank Manager Login')).click();
        element(by.buttonText('Open Account')).click();
        selectOptionByText('Shweta Shandilya');
        selectOptionByText(currency);        
        
        browser.sleep(2000);
        element(by.name('myForm')).submit();
        //expect(by.model('currency').getText()).toMatch(currency);
        browser.sleep(20000);


    }

    // Variables for various elements
    var customerLogin=element(by.buttonText('Customer Login'));
    var managerLogin=element(by.buttonText('Bank Manager Login'));
    var addingCustomer=element(by.buttonText('Add Customer'));
    var openingAccount=element(by.buttonText('Open Account'));
    var customers=element(by.buttonText('Customers'));
    var buttonElementByText=function(text){
       return element(by.buttonText(text));  
    }


    it('login page', function(){
        browser.get('http://www.way2automation.com/angularjs-protractor/banking/#/login');         
            //expect (customerLogin.isPresent()).toBeTruthy();
            //expect (buttonElementByText('Bank Manager Login').isPresent()).toBeTruthy();
       });   
    
    loginFunction = function (loginName)
    {
        browser.get('http://www.way2automation.com/angularjs-protractor/banking/#/login');
        browser.manage().window().maximize();        
        element(by.buttonText('Customer Login')).click();
        selectOptionByText(loginName);
        element(by.buttonText('Login')).click();
    };

    //test case for customer login
    it('Customer Login', function(){
        loginFunction('Harry Potter');       
    });

    //test case for initial transactios
    it('Initial Transaction', function(){
        loginFunction('Harry Potter');
        element(by.buttonText('Transactions')).click();
        //browser.sleep(20000);         
    });

    //test case for deposit money
    it('Deposit Money', function(){
        loginFunction('Harry Potter');
        selectOptionByText('1006');
        element(by.buttonText('Deposit')).click();
        element(by.model('amount')).sendKeys('2000');
        element(by.name('myForm')).submit();
       // browser.sleep(20000); 
    });

    //test case for transaction after deposit
    it('Transaction after Deposit', function(){
        loginFunction('Harry Potter');
        selectOptionByText('1006');
        element(by.buttonText('Transactions')).click();    
       // browser.sleep(20000);         
    });

    //test case for withdraw error
    it('Withdraw Error', function(){
        loginFunction('Harry Potter');
        selectOptionByText('1006');
        element(by.buttonText('Withdrawl')).click();
        element(by.model('amount')).sendKeys('2001');
        element(by.name('myForm')).submit();
       // browser.sleep(20000);        
    });

    //test case for withdraw with success
    it('Withdrawl Success', function(){
        loginFunction('Harry Potter');
        selectOptionByText('1006');
        element(by.buttonText('Withdrawl')).click();
        element(by.model('amount')).sendKeys('1000');
        element(by.name('myForm')).submit();
       // browser.sleep(20000);         
    });

    //test case for transaction after withdraw
    it('Transaction after Withdraw', function(){
        loginFunction('Harry Potter');
        selectOptionByText('1006');
        element(by.buttonText('Transactions')).click();
       // browser.sleep(20000);         
    });

    //test case for transaction reset
    it('Transaction Reset', function(){
        loginFunction('Harry Potter');
        selectOptionByText('1006');
        element(by.buttonText('Transactions')).click();
        element(by.buttonText('Reset')).click();
        browser.sleep(20000); 
       
    });
     
    //test case for transaction reset
    it('Transaction Back', function(){
        loginFunction('Harry Potter');
        selectOptionByText('1006');
        element(by.buttonText('Transactions')).click();
        element(by.buttonText('Back')).click();
        browser.sleep(20000); 
    });
   


       




});
