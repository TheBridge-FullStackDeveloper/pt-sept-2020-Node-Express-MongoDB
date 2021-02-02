const route = require("express").Router();

// Endpoints relativos a Users
const UsersModel = require("../models/Users");
const NeasModel = require("../models/Neas");

//=>punto 1
route.post("/", async (req, res, next) => {
  try {
    const x = req.body;

    console.log("este es x=>", x);

    const result = await UsersModel.create(x);

    res.status(201).json({
      success: "ok",
      data: result,
    });
  } catch (error) {
    console.error("> error retrieving user: ", error.message);
    next(new Error("error retrieving user"));
  }
});

//=>punto 2---get GET para obtener nombre, edad (sí, edad, no fecha de nacimiento),
//ocupación, número de afiliado, puntos y fecha de afiliación de un usuario dado su número de afiliación

route.get("/:afilNum", async (req, res, next) => {
  try {
    const afilNum = +req.params.afilNum;

    const user = await UsersModel.findOne(
      { affiliatedNumber: afilNum },
      { birthdate: 1 }
    );
    const birthdateUser = user.get("birthdate");

    let age = Date.now() - birthdateUser.getTime();

    let numyears = Math.floor(age / 31536000000);

    const result = await UsersModel.findOne(
      { affiliatedNumber: afilNum },
      {
        _id: 0,
        name: 1,
        occupation: 1,
        affiliationDate: 1,
        affiliatedNumber: 1,
        astronomicalPoints: 1,
      }
    );
    const finalRes = { ...result.toJSON(), age: numyears }; //result no nos llega en json por eso lo tenemos que convertir

    res.status(200).json({
      success: "ok",
      data: finalRes,
    });
  } catch (error) {
    console.error("> error retrieving user: ", error.message);
    next(new Error("error retrieving user"));
  }
});

//=>punto 3..mostrar badges de un usuario filtrando por afiliatedNumber

route.get("/:afilNum/badges", async (req, res, next) => {
  try {
    const afilNum = +req.params.afilNum;
    const result = await UsersModel.find(
      { affiliatedNumber: afilNum },
      { _id: 0, badges: 1 }
    );

    res.status(200).json({
      success: "ok",
      data: result,
    });
  } catch (error) {
    console.error("> error retrieving user: ", error.message);
    next(new Error("error retrieving user"));
  }
});

//punto 4
// GET para obtener la lista de todos los NEAs descubiertos por un usuario dado a partir de su número de afiliación
// Ejemplo: /astronomy/guild/123-23-45-33Y/neas

route.get("/:afilNum/neas", async (req, res, next) => {
  try {
    const afilNum = +req.params.afilNum;
    const result = await UsersModel.find(
      { affiliatedNumber: afilNum },
      { _id: 0, neasDiscovered: 1 }
    );

    res.status(200).json({
      success: "ok",
      data: result,
    });
  } catch (error) {
    console.error("> error retrieving user:", error.message);
    next(new Error("error retrieving user"));
  }
});
//punto 5
//GET para obtener la lista de todos los NECs descubiertos por un usuario dado a partir de su número de afiliación
route.get("/:afilNum/necs", async (req, res, next) => {
  try {
    const afilNum = +req.params.afilNum;
    const result = await UsersModel.find(
      { affiliatedNumber: afilNum },
      { _id: 0, necsDiscovered: 1 }
    );

    res.status(200).json({
      success: "ok",
      data: result,
    });
  } catch (error) {
    console.error("> error retrieving user:", error.message);
    next(new Error("error retrieving user"));
  }
});
//punto 6
//GET para obtener cuántos puntos tiene ese usuario
//Ejemplo: /astronomy/guild/123-23-45-33Y/points

route.get("/:afilNum/points", async (req, res, next) => {
  try {
    const afilNum = +req.params.afilNum;
    const result = await UsersModel.find(
      { affiliatedNumber: afilNum },
      { _id: 0, astronomicalPoints: 1 }
    );

    res.status(200).json({
      success: "ok",
      data: result,
    });
  } catch (error) {
    console.error("> error retrieving points:", error.message);
    next(new Error("error retrieving points"));
  }
});
//punto 7
//PUT para que un usuario pueda modificar su nickname y su ocupación
//Ejemplo: /astronomy/guild/123-23-45-33Y

route.put("/:afilNum", async (req, res, next) => {
  try {
    const afilNum = +req.params.afilNum;
    //dos formas de hacerlo:
    //primera con updateOne y $set:

    //   const result = await UsersModel.updateOne(
    //     { affiliatedNumber: afilNum },
    //     {
    //        $set : {nickname: "a-Gonz" ,occupation: "director" },
    //        $currentDate: { lastModified: true }
    //     }
    //   );

    //segunda con save()

    const result = await UsersModel.findOne(
      { affiliatedNumber: afilNum },
      { nickname: 1, occupation: 1 }
    );
    result.occupation = "presentadora";
    result.save();

    res.status(200).json({
      success: "ok",
      data: result,
    });
  } catch (error) {
    console.error("> error modifing:", error.message);
    next(new Error("error retrieving points"));
  }
});
//punto 8
//PUT para que cada vez que un usuario descubra un NEA se añada el nombre del asteroide al array de asteroides descubiertos.
// Además, si llega a 5 la suma entre neas y necs deberá pasar a true el campo “given” del badge correspondiente.
//Recuerda también que si es su primer NEA, hay otro badge relativo a dicho logro!
route.put("/:afilNum/neas", async (req, res, next) => {
  try {
    const afilNum = +req.params.afilNum;
    const neas = "Ryugu";

    const result = await UsersModel.findOne({ affiliatedNumber: afilNum }, {});
    result.neasDiscovered.push(neas);

    if (
      result.neasDiscovered.length === 1 &&
      result.badges[1].given === false
    ) {
      result.badges[1].given = true;
      result.astronomicalPoints += result.badges[1].points;
    }

    const arr1 = result.neasDiscovered;
    const arr2 = result.necsDiscovered;

    const concatDis = arr1.concat(arr2).length;
    if (concatDis >= 5) {
      result.badges[3].given = true;
      result.astronomicalPoints += result.badges[3].points;
    }
    if (concatDis >= 10) {
      result.badges[4].given = true;
      result.astronomicalPoints += result.badges[4].points;
    }
    result.save();

    res.status(200).json({
      success: "ok",
      data: result,
    });
  } catch (error) {
    console.error("> error retrieving neas:", error.message);
    next(new Error("error retrieving neas"));
  }
});
//punto 9
// PUT para que cada vez que un usuario descubra un NEC se añada el nombre del asteroide al array de asteroides descubiertos.
// Además si llega a 5 la suma entre neas y necs deberá pasar a true el campo “given” del badge correspondiente.
// Recuerda también que si es su primer NEC, hay otro badge relativo a dicho logro!

route.put("/:afilNum/necs", async (req, res, next) => {
  try {
    const afilNum = +req.params.afilNum;
    const nec = "khuphu";

    const result = await UsersModel.findOne({ affiliatedNumber: afilNum }, {});
    result.necsDiscovered.push(nec);
    if (
      result.necsDiscovered.length === 1 &&
      result.badges[2].given === false
    ) {
      result.badges[2].given = true;
      result.astronomicalPoints += result.badges[2].points;
    }
    const arr1 = result.neasDiscovered;
    const arr2 = result.necsDiscovered;

    const concatDis = arr1.concat(arr2).length;
    console.log("concatDis=>", concatDis);
    if (concatDis >= 5 && result.badges[3].given === false) {
      result.badges[3].given = true;
      result.astronomicalPoints += result.badges[3].points;
    }
    if (concatDis >= 10 && result.badges[4].given === false) {
      result.badges[4].given = true;
      result.astronomicalPoints += result.badges[4].points;
    }
    //if all given are true, make the last one true
    const badgesData = result.get("badges");
    let count = 0;
    console.log("badgesData=>", badgesData);
    badgesData.forEach((ele, index) => {
      const l = badgesData.length;
      ele.given === true ? (count = count + 1) : count;
      count == l - 1 && badgesData[l - 1].given === false
        ? (badgesData[l - 1].given = true) &&
          (result.astronomicalPoints += badgesData[l - 1].points)
        : badgesData[l - 1].given;
    });
    result.save();
    res.status(200).json({
      success: "ok",
      data: result,
    });
  } catch (error) {
    console.error(">error retrieving necs:", error.message);
    next(new Error("error retrieving necs"));
  }
});

//punto 10
//mirar si mongoDB tiene algun metodo para cambiar un campo a boolean sino hacer como punto 7
route.put("/:afilNum/delete", async (req, res, next) => {
  try {
    const afilNum = +req.params.afilNum;
    const result = await UsersModel.findOne(
      { affiliatedNumber: afilNum },
      {}
    );
    result.deleted = true;
    result.save();

    res.status(200).json({
      success: "ok",
      data: result,
    });
  } catch (error) {
    console.error(">error updating field:", error.message);
    next(new Error("error updating field"));
  }
});

//punto 11
//DELETE para eliminar definitivamente a un usuario si de verdad no quiere volver a la asociación
route.delete("/:afilNum", async (req, res, next) => {
  try {
    const afilNum = +req.params.afilNum

    const result = await UsersModel.deleteOne({affiliatedNumber: afilNum},{})

    res.status(200).json({
      success: "ok",
      data: result
    })
  } catch (error) {
    console.error(">error deleting user:", error.message);
    next(new Error("error deleting user"));
  }
});

module.exports = route;
