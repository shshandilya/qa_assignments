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
        //browser.sleep(20000);


        try {
            
            expect(browser.switchTo().alert().getText()).toMatch('Account created successfully with account Number');
            browser.switchTo().alert().dismiss();            
            }catch(err){            
            }    
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
            expect (customerLogin.isPresent()).toBeTruthy();
            expect (buttonElementByText('Bank Manager Login').isPresent()).toBeTruthy();
       });

    it('Manager Login', function(){
        browser.get('http://www.way2automation.com/angularjs-protractor/banking/#/login');
        browser.manage().window().maximize();
        element(by.buttonText('Bank Manager Login')).click();
        expect (buttonElementByText('Add Customer').isPresent()).toBeTruthy();
        expect (buttonElementByText('Open Account').isPresent()).toBeTruthy();
        expect (buttonElementByText('Customers').isPresent()).toBeTruthy();
    });



    // it block is test cases
    it('Add customer', function(){
        browser.get('http://www.way2automation.com/angularjs-protractor/banking/#/login');
        browser.manage().window().maximize();        
        //element(by.model('yourName')).sendKeys('Shan');
        element(by.buttonText('Bank Manager Login')).click();
        element(by.buttonText('Add Customer')).click();
        element(by.model('fName')).sendKeys('Shweta');
        element(by.model('lName')).sendKeys('Shandilya');        
        element(by.model('postCd')).sendKeys('1234');        
        //element(by.css(button[type = 'submit'])).click();
        element(by.name('myForm')).submit();
        //browser.sleep(2000);    
        try {
            expect(browser.switchTo().alert().getText()).toMatch('Customer added successfully with customer id');
            browser.switchTo().alert().dismiss();
            }catch(err){            
            }
    });

    
// test case for dollar
    it('Open Account For Dollar', function(){
        testCurrency('Dollar');
    
    });  
    //test case for pound
    it('Open Account For Pound', function(){
        testCurrency('Pound');    
    });      

    //test case for pound
    it('Open Account For Rupee', function(){
        testCurrency('Rupee');    
    });   

    //test case for deete customer
    it('Delete Customer', function(){
        browser.get('http://www.way2automation.com/angularjs-protractor/banking/#/login');
        browser.manage().window().maximize();        
        //element(by.model('yourName')).sendKeys('Shan');
        element(by.buttonText('Bank Manager Login')).click();
        element(by.buttonText('Customers')).click();   
        element(by.model('searchCustomer')).sendKeys('Shweta');
       // browser.sleep(2000); 
        element(by.buttonText('Delete')).click();
        expect(element.all(by.binding('Shweta')).isPresent()).toBeFalsy();
        //browser.sleep(2000); 
    });

    
    loginFunction = function (loginName)
    {
        browser.get('http://www.way2automation.com/angularjs-protractor/banking/#/login');
        browser.manage().window().maximize();        
        element(by.buttonText('Customer Login')).click();
        selectOptionByText(loginName);
        element(by.buttonText('Login')).click();
        browser.sleep(2000);
    };

    //test case for customer login
    it('Customer Login', function(){
        loginFunction('Harry Potter');       
        expect(element(by.className("fontBig ng-binding")).getText()).toMatch('Harry Potter');
    });

    //test case for customer login
    it('Verify Currency', function(){
        loginFunction('Harry Potter');       
        expect(element(by.binding('currency')).getText()).toMatch('Dollar');
        selectOptionByText('1005');
        expect(element(by.binding('currency')).getText()).toMatch('Pound');
        selectOptionByText('1006');
        expect(element(by.binding('currency')).getText()).toMatch('Rupee');
        browser.sleep(2000);
    });
    

    //test case for initial transactios
    it('Initial Transaction', function(){
        loginFunction('Harry Potter');
        selectOptionByText('1005');
        element(by.buttonText('Transactions')).click();
        expect(element.all(by.repeater('tx in transactions')).count()).toEqual(0);
    });


    //test case for deposit money
    it('Deposit Money', function(){
        loginFunction('Harry Potter');
        selectOptionByText('1006');
        element(by.buttonText('Deposit')).click();
        element(by.model('amount')).sendKeys('2000');
        element(by.name('myForm')).submit();
        expect(element(by.binding('amount')).getText()).toMatch('2000'); 
    });


    //test case for transaction after deposit
    it('Transaction after Deposit', function(){
        loginFunction('Harry Potter');
        selectOptionByText('1006');
        element(by.buttonText('Transactions')).click();    
        expect(element.all(by.repeater('tx in transactions')).count()).toEqual(1);
        var rows=element.all(by.repeater('tx in transactions'));
        var cells = rows.all(by.tagName('td'));        
        
        expect( cells.get(1).getText()).toMatch('2000');
        expect( cells.get(2).getText()).toMatch('Credit');
    });

    
    //test case for withdraw error
    it('Withdraw Error', function(){
        loginFunction('Harry Potter');
        selectOptionByText('1006');
        element(by.buttonText('Withdrawl')).click();
        element(by.model('amount')).sendKeys('2001');
        element(by.name('myForm')).submit();
        
        expect(element(by.className('error ng-binding')).isPresent()).toBeTruthy();
        expect(element(by.className('error ng-binding')).getText()).toMatch('Transaction Failed');
    });

    //test case for withdraw with success
    it('Withdrawl Success', function(){
        loginFunction('Harry Potter');
        selectOptionByText('1006');
        element(by.buttonText('Withdrawl')).click();
        element(by.model('amount')).sendKeys('1000');
        element(by.name('myForm')).submit();

        // Check Transaction
        expect(element(by.className('error ng-binding')).isPresent()).toBeTruthy();
        expect(element(by.className('error ng-binding')).getText()).toMatch('Transaction successful');
        expect(element(by.binding('amount')).getText()).toMatch('1000'); 

    });

    //test case for transaction after withdraw
    it('Transaction after Withdraw', function(){
        loginFunction('Harry Potter');
        selectOptionByText('1006');
        element(by.buttonText('Transactions')).click();

        // Check Table entries
        var rows=element.all(by.repeater('tx in transactions'));
        var cells = rows.last().all(by.tagName('td'));        
        expect( cells.get(1).getText()).toMatch('1000');
        expect( cells.get(2).getText()).toMatch('Debit');

    });

    
    //test case for transaction reset
    it('Transaction Reset', function(){
        loginFunction('Harry Potter');
        selectOptionByText('1006');
        element(by.buttonText('Transactions')).click();
        element(by.buttonText('Reset')).click();

        // Check Empty Transactions
        expect(element.all(by.repeater('tx in transactions')).count()).toEqual(0);
    });

    
    //test case for transaction reset
    it('Transaction Back', function(){
        loginFunction('Harry Potter');
        selectOptionByText('1006');
        element(by.buttonText('Transactions')).click();
        element(by.buttonText('Back')).click();

        // Test
        expect(element(by.className("fontBig ng-binding")).getText()).toMatch('Harry Potter');
        expect(element.all(by.tagName("strong")).getText()).toMatch('Welcome');        
    });
    
    
    //test case for Logout
    it('Logout', function(){
        loginFunction('Harry Potter');
        element(by.buttonText('Logout')).click();
                        
        // Test
        expect(element(by.model('custId')).isPresent()).toBeTruthy();
    });

});