import chalk from "chalk";
import inquirer from "inquirer";
// Currency Conerter API Link
let apilink = "https://v6.exchangerate-api.com/v6/882e244d0f4b23d430ab80de/latest/pkr";
// Fetching Data 
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};
let data = await fetchData(apilink);
// Object Converting array
let countries = Object.keys(data);
// User Input in First Country
let firstCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting From",
    choices: countries,
});
// First country Currency Details
// console.log(`Converting from ${chalk.greenBright.bold(firstCountry.name)}`)
// console.log(countries)
// console.log(data)
let userMoney = await inquirer.prompt({
    type: "number",
    name: "rupee",
    message: `Please enter the amount in ${chalk.greenBright.bold(firstCountry.name)}:`
});
// console.log(userMoney.rupee)
// Converting Currency
let secondCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Coverting From to",
    choices: countries,
});
// Conversion Rate
let cnv = `https://v6.exchangerate-api.com/v6/882e244d0f4b23d430ab80de/pair/${firstCountry.name}/${secondCountry.name}`;
// console.log(cnv)
// Fetching Data for conversion rate
let cnvData = async (data) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;
};
let conversionRate = await cnvData(cnv);
let convertedRate = Math.floor(userMoney.rupee * conversionRate);
// console.log(a)
console.log(`your ${chalk.bold.greenBright(firstCountry.name)} ${chalk.bold.greenBright(userMoney.rupee)} in ${chalk.bold.greenBright(secondCountry.name)} ${chalk.bold.greenBright(convertedRate)}`);
