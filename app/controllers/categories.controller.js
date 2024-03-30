const db = require("../models");
const Category = db.category;

exports.create = (req, res) => {
  const category = new Category({
    userId: req.userId,
    name: req.body.name,
    icon: req.body.icon,
  });

  category.save((err, category) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ 
      success: true
    });
  });
};

exports.list = (req, res) => {
  Category.find({
    userId: req.userId
  }).exec((err, categories) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    let result = [];
    try {
      result = categories.map(category => {
        return {
          id: category.id,
          name: category.name,
          icon: category.icon
        }
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
      return;
    }
    
    res.status(200).send({
      success: true,
      result: {categories: result}
    });
  });
}

// exports.show = (req, res) => {
//   Account.findById(req.params.id).exec((err, account) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }

//     let result = null;
//     try {
//         const currency = currencyRepository.items.find((currency) => currency.id == account.currencyId);
//         const accountType = accountTypesRepository.items.find((accountType) => accountType.id == account.accountTypeId);

//         result = {
//           id: account.id,
//           name: account.name,
//           accountTypeId: account.accountTypeId,
//           accountType: accountType.name,
//           currencyId: account.currencyId,
//           currency: {
//             symbol: currency.symbol,
//             code: currency.code
//           },
//           currentBalance: (account.currentBalance ?? 0).toFixed(2),
//           isArchived: account.isArchived ?? false
//         }
//     } catch (err) {
//       res.status(500).send({ message: err.message });
//       return;
//     }
    
//     res.status(200).send({
//       success: true,
//       result: result
//     });
//   });
// }

exports.update = (req, res) => {
  var conditions = {
    _id : req.params.id,
    userId: req.userId
  }

  var update = {
    name: req.body.name,
    icon: req.body.icon,
  }

  Category.findOneAndUpdate(conditions, update, function(err, result) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({
      success: true
    });
  });
}