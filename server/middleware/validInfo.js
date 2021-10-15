// Este archivo permite hacer una validación de los datos antes de ingresarlos a la BD


module.exports = (req, res, next) => {
    const { email, name, lastname, password } = req.body;
    
    // Comprobar que el email sea un email
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
      console.log(!email.length);
      // Comprueba que ninguno de los campos esté vacío
      if (![email, name, lastname, password].every(Boolean)) {
        return res.status(401).json("Campos vacíos");
      } else if (!validEmail(email)) {
        return res.status(401).json("Email inválido");
      }
      // Mismo procedimiento pero con login
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.status(401).json("Campos vacíos");
      } else if (!validEmail(email)) {
        return res.status(401).json("Email inválido");
      }
    }
  
    next();
  };