
//otra manera de hacer save para un documento=>

const resultUpdate = await UsersModel.updateOne(
      { affiliatedNumber: afilNum },
      { $addToSet: { neasDiscovered: "Bennu" } }
    );

   // ejemplo de push
    const John = people.findOne({name: "John"});
    John.friends.push({firstName: "Harry", lastName: "Potter"});
    John.save();