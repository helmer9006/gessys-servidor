const multer = require("multer");
const shortid = require("shortid");


exports.subirArchivo = async (req, res, next) => {
  const configuracionMulter = {
    limits: { fileSize: 1024 * 1024 * 10 },
    storage: (fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + "/../uploads");
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(
          file.originalname.lastIndexOf("."),
          file.originalname.length
        );
        cb(null, `${shortid.generate()}${extension}`);
      },
    //Para prohibir cargue de pdf, aplica para otros tipos
    //   fileFilter: (req, file, cb) => {
    //     if (file.mimetype === "application/pdf") {
    //       return cb(null, true);
    //     }
    //   },
    })),
  };

  const upload = multer(configuracionMulter).single("archivo");

  upload(req, res, async (error) => {
    console.log(req.file);

    if (!error) {
      res.json({ archivo: req.file });
    } else {
      console.log(error);
      return next();
    }
  });
};

exports.subirArchivos = async (req, res, next) => {
    const configuracionMulter = {
      limits: { fileSize: 1024 * 1024 * 10 },
      storage: (fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, __dirname + "/../uploads");
        },
        filename: (req, file, cb) => {
          const extension = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
          );
          cb(null, `${shortid.generate()}${extension}`);
        },
      //Para prohibir cargue de pdf, aplica para otros tipos
      //   fileFilter: (req, file, cb) => {
      //     if (file.mimetype === "application/pdf") {
      //       return cb(null, true);
      //     }
      //   },
      })),
    };
  
    const upload = multer(configuracionMulter).array("archivo");
  
    upload(req, res, async (error) => {
      console.log(req.files);
  
      if (!error) {
        res.json({ archivo: req.files });
      } else {
        console.log(error);
        return next();
      }
    });
  };

exports.eliminarArchivo = async (req, res) => {
  console.log(req.archivo);

  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`);
    console.log("Archivo Eliminado");
  } catch (error) {
    console.log(error);
  }
};


