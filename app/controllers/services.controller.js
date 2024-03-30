const currenciesRepository = require("../repositories/currencies.repository");
const accountTypesRepository = require("../repositories/account-types.repository");

exports.getCurrencies = (req, res) => {
    res.status(200).send({
        success: true,
        result: {
            items: currenciesRepository.items.map(currency => {
                return {
                    id: currency.id,
                    name: currency.name,
                    code: currency.code,
                    symbol: currency.symbol,
                    symbolNative: currency.symbol_native
                }
            })
        }
    });
};

exports.getAccountTypes = (req, res) => {
    res.status(200).send({
        success: true,
        result: {
            items: accountTypesRepository.items.map(accountType => {
                return {
                    id: accountType.id,
                    name: accountType.name
                }
            })
        }
    });
};