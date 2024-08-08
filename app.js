const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const upload = require("./utils/multer");
const applicationUpload = require("./utils/application");
const videoUpload = require("./utils/multer-video");
const uploadHero = require("./middlewares/file.uplaod");

const app = express();

const authMiddleware = require("./middlewares/auth");

const blogPostRoute = require("./routes/blog.post");
const applicationRoute = require("./routes/application");
const partnerRoute = require("./routes/home/partner");
const heroRoute = require("./routes/home/hero");
const servicesRoute = require("./routes/home/services");
const aboutBannerRoute = require("./routes/about/banner");
const aboutValuesRoute = require("./routes/about/value");
const visionMissionRoute = require("./routes/about/vision-mission");
const homeWhyRoute = require("./routes/home/why");
const registerRoute = require("./routes/auth/register");
const loginRoute = require("./routes/auth/login");
const caseStudies = require("./routes/case-studies/index");
const videoRoute = require("./routes/home/why-video");
const fabricationRoute = require("./routes/services/fabrication");
const installationRoute = require("./routes/services/installation");
const maintenanceRoute = require("./routes/services/maintenance");
const heroImages = require("./routes/home/hero-images/hero.images");
const footerText = require("./routes/home/footer");
const tranosEliteRange = require("./routes/products/tranos-elite-range");
const siemensSivacon = require("./routes/products/siemens-sivacon");
const atexPowerPanels = require("./routes/products/atex-power-panels");
const siemensSimoprime = require("./routes/products/siemens-simoprime");
const siemensSimosec = require("./routes/products/siemens-simosec");
const tranosTrac = require("./routes/products/cable-management/tranos-trac");
const tranosEris = require("./routes/products/cable-management/tranos-eris");
const tranosEllis = require("./routes/products/cable-management/tranos-ellis");
const standardPalletRacks = require("./routes/products/warehouse/standard-pallet");
const industrialWarehouseShelving = require("./routes/products/warehouse/industrial-warehouse-shelving");
const mezzanines = require("./routes/products/warehouse/mezzanines");
const palletRack = require("./routes/products/warehouse/pallet-rack");
const getUsers = require("./routes/auth/user");

// Middlewares
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/v1/blog", blogPostRoute);
app.use(
  "/api/v1/application",
  applicationUpload.single("resumeUrl"),
  applicationRoute
);
app.use("/api/v1/home", partnerRoute);
app.use("/api/v1/home", heroRoute);
app.use("/api/v1/home", servicesRoute);
app.use("/api/v1/about", aboutBannerRoute);
app.use("/api/v1/about", aboutValuesRoute);
app.use("/api/v1/about", visionMissionRoute);
app.use("/api/v1/home", homeWhyRoute);
app.use("/api/v1/auth", registerRoute);
app.use("/api/v1/auth", loginRoute);
app.use("/api/v1/case-studies", caseStudies);
app.use("/api/v1/home-video", videoRoute);
app.use("/api/v1/services/fabrication", fabricationRoute);
app.use("/api/v1/services/installation", installationRoute);
app.use("/api/v1/services/maintenance", maintenanceRoute);
app.use("/api/v1/hero-images", heroImages);
app.use("/api/v1", footerText);
app.use("/api/v1/products", tranosEliteRange);
app.use("/api/v1/products", siemensSivacon);
app.use("/api/v1/products", atexPowerPanels);
app.use("/api/v1/products", siemensSimoprime);
app.use("/api/v1/products", siemensSimosec);
app.use("/api/v1/products", tranosTrac);
app.use("/api/v1/products", tranosEris);
app.use("/api/v1/products", tranosEllis);
app.use("/api/v1/products", standardPalletRacks);
app.use("/api/v1/products", industrialWarehouseShelving);
app.use("/api/v1/products", mezzanines);
app.use("/api/v1/products", palletRack);
app.use("/api/v1/auth", getUsers);

module.exports = app;

// DATABASE=mongodb+srv://delz:uN7Wo6kF2MYtLncl@cluster0.zacl9s2.mongodb.net/tranos

// DATABASE=mongodb+srv://delz:uN7Wo6kF2MYtLncl@cluster0.zacl9s2.mongodb.net/tranos
