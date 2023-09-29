class GetDataFromApi {
    url = "";
    data = null;

    constructor(newURL) {
        this.url = newURL;
    }

    async getData() {
        
        await fetch(this.url)
                .then(function (response) {     // vanaf async tot en met this.data = data; gebeurt  in de achtergrond 
                    return response.json();
                }).then((data) => {
                    this.data = data;       //this.data = data; zorgt er voor dat pending kans wordt verlaagt en of dat er geen "pending" komt 
                });
            return this.data;
        }
}

class Header {
    headerElement;
    figureelement;
    logoIElement;
    logoHeadingElement;
    avatarWrapperElement;
    avatarBodyElement;
    avatarHeadElement;
    avatarElement;
    placeToRenderHeader;

    constructor(placeToRenderHeader) {
        this.placeToRenderHeader = document.getElementsByTagName(placeToRenderHeader)[0];
        this.headerElement = document.createElement("header");
        this.headerElement.classList = "header";

        this.figureElement = document.createElement("figure");
        this.figureElement.classList = "header__logo";

        this.logoIElement = document.createElement("i");
        this.logoIElement.classList = "fa-solid fa-money-bill-transfer";

        this.logoHeadingElement = document.createElement("h1");
        this.logoHeadingElement.classList = "header__banky";
        this.logoHeadingElement.innerText = "Banky";

        this.avatarWrapperElement = document.createElement("div");
        this.avatarWrapperElement.classList = "avatarwrapper";

        this.avatarElement = document.createElement("figure");
        this.avatarElement.classList = "avatar";

        this.avatarHeadElement = document.createElement("div");
        this.avatarHeadElement.classList = "avatar__head";

        this.avatarBodyElement = document.createElement("div");
        this.avatarBodyElement.classList = "avatar__body";
    }

    render() {
        this.headerElement.appendChild(this.figureElement);
        this.figureElement.appendChild(this.logoIElement);
        this.figureElement.appendChild(this.logoHeadingElement);
        this.headerElement.appendChild(this.avatarWrapperElement);
        this.avatarWrapperElement.appendChild(this.avatarElement);
        this.avatarElement.appendChild(this.avatarHeadElement);
        this.avatarElement.appendChild(this.avatarBodyElement);

        this.placeToRenderHeader.appendChild(this.headerElement);
    }
}

class BankyMain {
    placeToRenderBankyMain;
    leftSection;
    rightSection;

    constructor(placeToRenderBankyMain) {
        this.placeToRenderBankyMain = document.getElementsByTagName(placeToRenderBankyMain)[0];
        /* main */
        this.mainElement = document.createElement("main");
        this.mainElement.classList = "banky";

        this.leftSection = new BankyLeftSection(this.mainElement);
        this.rightSection = new BankyRightSection(this.mainElement, this);
    }

    makeButtonsFromData(data) {
        this.rightSection.makeButtonsFromData(data);
    }

    makeTransactionsFromData(data) {
        this.leftSection.makeTransactionsFromData(data.items[0].transactions);
    }

    callFromRightSection(account,data) {
        this.leftSection.makeTransactionsFromData(account.transactions, data);
    }
    render() {
        /* main */
        this.placeToRenderBankyMain.appendChild(this.mainElement);
        this.leftSection.render();
        this.rightSection.render();
    }
}

class BankyLeftSection {
    mainElement;
    constructor(mainElement) {
        this.mainElement = mainElement;
        /* left section */
        this.leftSectionElement = document.createElement("section");
        this.leftSectionElement.classList = "banky__section banky__section--left";

        this.bankyHeaderElement = document.createElement("header");
        this.bankyHeaderElement.classList = "banky__header";

        this.bankyHeaderWrapElement = document.createElement("div");

        this.bankyLogoElement = document.createElement("figure");
        this.bankyLogoElement.classList = "banky__logo";

        this.bankyLogoIElement = document.createElement("i");
        this.bankyLogoIElement.classList = "fa-solid fa-house";

        this.bankyLogoText = document.createElement("h1");
        this.bankyLogoText.classList = "banky__money";

        this.eyeButton = document.createElement("button");
        this.eyeButton.classList = "banky__eyeButton";
        this.eyeButton.onclick = this.eyeButtonClicked;


        this.eyeFigure = document.createElement("figure");
        this.eyeFigure.classList = "banky__eye";

        this.eyeI = document.createElement("i");
        this.eyeI.classList = "fa-solid fa-eye";

        this.transactionsElement = document.createElement("ul");
        this.transactionsElement.classList = "banky__transactions";

    }

    eyeButtonClicked = () => {
        this.transactionsElement.classList.toggle("banky__transactions--blur");
        this.bankyLogoText.classList.toggle("banky__money--blur");
    }
    makeTransactionsFromData(transactions) {
        let totalMoney = 0;
        for (let i = 0; i < transactions.length; i++){
            totalMoney += transactions[i]["amount"];
        }

        this.bankyLogoText.innerText = "Saldo" + "€" + totalMoney;
        
        //empty ul before we make li
        this.transactionsElement.innerHTML = "";
        for (let i = 0; i < transactions.length; i++){
            this.transactionElement = document.createElement("li");
            this.transactionElement.classList = "banky__transaction";
           
            this.transactionFrom = document.createElement("h3");
            this.transactionFrom.classList = "banky__name";
            this.transactionFrom.innerText = transactions[i]["from/to"];

            this.transactionAmount = document.createElement("h3");
            this.transactionAmount.classList = "banky__amount";
            this.transactionAmount.innerText = transactions[i]["amount"];
        

            
          
            this.transactionsElement.appendChild(this.transactionElement);
            this.transactionElement.appendChild(this.transactionFrom);
            this.transactionElement.appendChild(this.transactionAmount);

        }
    }
        render() {
            
            this.mainElement.appendChild(this.leftSectionElement);
            /* left section */
            this.leftSectionElement.appendChild(this.bankyHeaderElement);
            this.bankyHeaderElement.appendChild(this.bankyHeaderWrapElement);
            this.bankyHeaderWrapElement.appendChild(this.bankyLogoElement);
            this.bankyLogoElement.appendChild(this.bankyLogoIElement);
            this.bankyHeaderWrapElement.appendChild(this.bankyLogoText);
            this.bankyHeaderWrapElement.appendChild(this.eyeButton);

            this.eyeButton.appendChild(this.eyeFigure);
            this.eyeFigure.appendChild(this.eyeI);
            this.leftSectionElement.appendChild(this.transactionsElement); 

            
            this.transferButton = document.createElement("button");
            this.transferButton.classList = "banky__transferButton";
            this.transferButton.innerText = "Overboeken";
            this.leftSectionElement.appendChild(this.transferButton);
    }
    
    
}
    
class BankyRightSection {
    mainElement;
    bankyMain;
    constructor(mainElement, bankyMain) {
        this.mainElement = mainElement;
        this.bankyMain = bankyMain;
 

        /* right section */
        this.rightSectionElement = document.createElement("section");
        this.rightSectionElement.classList = "banky__section banky__section--right";

        this.accountsElement = document.createElement("ul");
        this.accountsElement.classList = "banky__accounts";
    }

    
    makeButtonsFromData(data) {
             data.items.forEach((entry) => {
                this.accountElement = document.createElement("li");
                this.accountElement.classList = "banky__account";
                this.accountElement.onclick = () => {
                    this.bankyMain.callFromRightSection(entry,data);
                }
        
                this.bankySwitchButton = document.createElement("button");
                this.bankySwitchButton.classList = "banky__switchAccount";
        
                this.bankySwitchAccountFigure = document.createElement("figure");
                this.bankySwitchAccountFigure.classList = "banky__logo";
        
                this.bankySwitchI = document.createElement("i");
                this.bankySwitchI.classList = entry.icon;
        
                this.bankyNameofAccount = document.createElement("h4");
                this.bankyNameofAccount.classList = "banky__nameOfAccount";
                this.bankyNameofAccount.innerText = entry.name;
                
                this.accountsElement.appendChild(this.accountElement);
                this.accountElement.appendChild(this.bankySwitchButton);
                this.bankySwitchButton.appendChild(this.bankySwitchAccountFigure);
                this.bankySwitchAccountFigure.appendChild(this.bankySwitchI);
                this.accountElement.appendChild(this.bankyNameofAccount);
            
            })
           
    }

    render() {
        /* right section */
        this.mainElement.appendChild(this.rightSectionElement);
        this.rightSectionElement.appendChild(this.accountsElement);
      
    }
}


class App {
    BankyHeader;
    BankyMain;
    GetDataFromApi;

    constructor() {
        this.header = new Header("body");
        this.bankyMain = new BankyMain("body");

        this.GetDataFromApi = new GetDataFromApi("data/transactions.json");
        
            this.GetDataFromApi
                .getData().then( (data) => {
                    this.bankyMain.makeTransactionsFromData(data); //  <-- ik was dit vergeten te voegen
                    this.bankyMain.makeButtonsFromData(data);
                });

        this.header.render();
        this.bankyMain.render();
    }
}

 const app = new App();

//Video 7/9 Timestamp: ...
